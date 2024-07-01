import React, { createContext, FC, useContext, ReactNode, useState, useEffect } from 'react'

import { Modal, Button } from 'react-daisyui'
import useLogger from '@hooks/useLogger'
import { useSubscribeForPushNotificationsMutation, SubscribeForPushNotificationsMutationVariables } from '@graphql/_generated/graphql'
import { useLocalStorage } from 'react-use'
import { urlBase64ToUint8Array } from '@utilities/common'
import translations from '@root/languages/translations'
import useLanguageContext from '@contexts/languageContext'



const PushNotificationsContext = createContext<ReturnType<typeof usePushNotifications> | null>(null)



interface PushNotificationsProviderProps {
  children: ReactNode
}



export const PushNotificationsProvider: FC<PushNotificationsProviderProps> = ({ children }) => {
  // helpers
  const { language } = useLanguageContext()
  const pushNotifications = usePushNotifications()

  return (
    <PushNotificationsContext.Provider value={ pushNotifications }>
      { children }

      <Modal open={ pushNotifications.promise !== null } onClickBackdrop={ pushNotifications.handleDecline }>
        <Modal.Header className='flex flex-col gap-12 font-bold'>
          { translations.gettingPushNotifications[language] }
        </Modal.Header>

        <Modal.Body>
          { translations.gettingPushNotificationsDescription[language] }
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={ pushNotifications.handleAccept } color='primary'>{ translations.yes[language] }</Button>
          <Button onClick={ pushNotifications.handleDecline } color='ghost'>{ translations.no[language] }</Button>
        </Modal.Actions>
      </Modal>
    </PushNotificationsContext.Provider>
  )
}



export default function usePushNotificationsContext() {
  const context = useContext(PushNotificationsContext)

  if (context === null) {
    throw new Error('"usePushNotificationsContext" should be used within <PushNotificationsProvider/>.')
  }

  return context
}



interface promiseActions {
  resolve: () => void,
  reject: () => void
}



// TODO: Implement permissions reset in account page.
function usePushNotifications() {
  // helpers
  const { debug } = useLogger('usePushNotifications')



  // graphql
  const [ subscribeForPushNotificationsMutation ] = useSubscribeForPushNotificationsMutation()



  // modal promise
  const [ promise, setPromise ] = useState<promiseActions | null>(null)

  function handleAccept() {
    if (promise === null)
      return

    promise.resolve()
    setPromise(null)
  }

  function handleDecline() {
    if (promise === null)
      return

    promise.reject()
    setPromise(null)
  }



  // push subscription
  const [ subscription, setSubscription ] = useState<PushSubscription | null>(null)
  const [
          userNotificationsConsent,
          setUserNotificationsConsent,
          removeUserNotificationsConsent
        ] = useLocalStorage<NotificationPermission>('user-notifications-consent')



  // initialization
  useEffect(() => {
    (
      async function () {
        debug('useEffect', 'started')
        // check if service worker is supported
        if (!(
          'serviceWorker' in navigator
        ))
          return debug('useEffect', 'ended - service worker not supported')

        // get service worker when ready
        debug('useEffect', 'waiting for service worker')
        const serviceWorker = await navigator.serviceWorker.ready

        // check if notifications are supported
        if (!(
          'PushManager' in window
        ))
          return debug('useEffect', 'ended - push API not supported')

        // permission consent
        const browser = {
          granted: Notification.permission === 'granted',
          denied: Notification.permission === 'denied',
          default: Notification.permission === 'default'
        }

        const user = {
          granted: userNotificationsConsent === 'granted',
          denied: userNotificationsConsent === 'denied',
          default: userNotificationsConsent === 'default'
        }

        const ask = !user.denied && browser.default

        if (ask) {
          debug('useEffect', 'asking for permission')
          removeUserNotificationsConsent()

          await new Promise<NotificationPermission>((resolve, reject) => {
            setPromise({
              async resolve() {
                resolve(await Notification.requestPermission())
              },
              async reject() {
                reject('User denied push notifications')
              }
            })
          })
            .then(permission => {
              setUserNotificationsConsent(permission)
            })
            .catch(reason => {
              setUserNotificationsConsent('denied')
              console.warn(reason)
            })
        } else if (!user.denied) {
          setUserNotificationsConsent(Notification.permission)
        }

        if (Notification.permission !== 'granted')
          return debug('useEffect', 'permission not granted')
        else
          debug('useEffect', 'permission granted')

        // subscribe to push notification server
        // PROBLEM
        //   - Application:           Android Firefox 110.1.0
        //   - Console error message: Uncaught (in promise) DOMException: User denied permission to use the Push API.
        //   - Bug tracker:           https://bugzilla.mozilla.org/show_bug.cgi?id=1807379

        debug('useEffect', 'await serviceWorker.pushManager.subscribe')
        const subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_PUSH_NOTIFICATIONS_PUBLIC_KEY!)
        })
        setSubscription(subscription)
        debug('useEffect', `done, subscription = ${ JSON.stringify(subscription.toJSON()) }`)
      }
    )()
  }, [])



  //
  useEffect(() => {
    if (!subscription)
      return debug('useEffect', 'no subscription', [ 'subscription' ])

    const subscriptionJson = subscription.toJSON()

    if (!subscriptionJson.endpoint || !subscriptionJson.keys?.auth || !subscriptionJson.keys?.p256dh)
      return debug('useEffect', 'subscription data missing (endpoint or one of the keys)', [ 'subscription' ])

    const variables: SubscribeForPushNotificationsMutationVariables = {
      userAgent: navigator.userAgent,
      endpoint: subscriptionJson.endpoint,
      auth: subscriptionJson.keys.auth,
      p256dh: subscriptionJson.keys.p256dh
    }

    subscribeForPushNotificationsMutation({ variables })
      .then(result => {
        debug('useEffect', `successfuly subscribed, result = ${ JSON.stringify(result) }`, [ 'subscription' ])
      })
      .catch((error: Error) => {
        debug('useEffect', `subscription failed, error = ${ JSON.stringify(error) }`, [ 'subscription' ])
      })
  }, [ subscription ])



  return {
    promise,
    handleAccept,
    handleDecline,
    subscription
  }
}
