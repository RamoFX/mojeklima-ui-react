import React, { useMemo, useEffect, ReactNode } from 'react'
import { Menu } from 'react-daisyui'
import { FocusLayout } from '@components/layouts/FocusLayout'
import useTitle from '@hooks/useTitle'
import { useAllNotificationsQuery, AllNotificationsQuery, useSeenAllMutation } from '@graphql/_generated/graphql'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { Drop, Wind, Thermometer, Notification, Gauge } from 'phosphor-react'
import { Notice } from '@components/data-state/Notice'
import { DataUnavailable } from '@components/data-state/DataUnavailable'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



enum category {
  new       = 'new',
  last24h   = 'last24h',
  lastWeek  = 'lastWeek',
  lastMonth = 'lastMonth',
  older     = 'older'
}



type notifications = AllNotificationsQuery['allNotifications']
type notification = notifications[number]
type sections = Record<category, notifications>



export default function NotificationsPage() {
  // helpers
  const { language } = useLanguageContext()
  useTitle(translations.notifications[language])



  // graphql
  const allNotifications = useAllNotificationsQuery({
    fetchPolicy: 'network-only'
  })
  const [ seenAll ] = useSeenAllMutation()



  // main logic
  function notificationToMenuItem(notification: notification) {
    function getIcon() {
      const iconProps = { className: 'flex-shrink-0', weight: 'duotone', size: 24 } as const

      switch (notification.alert.criteria) {
        case 'TEMPERATURE':
          return <Thermometer { ...iconProps } />

        case 'HUMIDITY':
          return <Drop { ...iconProps } />

        case 'WIND_SPEED':
          return <Wind { ...iconProps } />

        case 'PRESSURE':
          return <Gauge { ...iconProps } />

        default:
          return <Notification { ...iconProps } />
      }
    }

    return (

      <Menu.Item key={ notification.id }>
      <button color='ghost' className='items-start'>
        { getIcon() }

        <div className='flex flex-col text-left'>
          <span className='font-medium'>{ notification.alert.message }</span>
          <span className='text-sm opacity-75'>
            <span>{ notification.alert.location.name }</span>
            <span className='px-1'>&#x2022;</span>
            <span>
              { new Date(notification.createdAt).toLocaleDateString('cs') }

              <span> </span>

              { new Date(notification.createdAt).toLocaleTimeString('cs') }
            </span>
          </span>
        </div>
      </button>
    </Menu.Item>
    )
  }

  function section(sections: sections, categoryKey: category) {
    if (!sections[categoryKey] || !(
      sections[categoryKey].length > 0
    ))
      return <></>

    return (
      <>
      <Menu.Title className='uppercase'>{ translations[categoryKey][language] }</Menu.Title>

        { sections[categoryKey].map(notification => notificationToMenuItem(notification)) }
    </>
    )
  }


  const sections = useMemo(() => {
    const sections_temp: sections = {
      [category.new]: [],
      [category.last24h]: [],
      [category.lastWeek]: [],
      [category.lastMonth]: [],
      [category.older]: []
    }

    if (allNotifications.loading || !allNotifications.data)
      return sections_temp

    // helpers
    function add(key: category, notification: notification) {
      sections_temp[key].push(notification)
    }

    const day = 1000 * 60 * 60 * 24

    const isToday = (date: string) => new Date(date).getTime() > Date.now() - day
    const isThisWeek = (date: string) => new Date(date).getTime() > Date.now() - day * 7
    const isThisMonth = (date: string) => new Date(date).getTime() > Date.now() - day * 30

    // split into sections by notification creation time
    const notifications = Array.from(allNotifications.data.allNotifications)
                               .reverse()

    for (let notification of notifications) {
      if (!notification.seen)
        add(category.new, notification)

      else if (isToday(notification.createdAt))
        add(category.last24h, notification)

      else if (isThisWeek(notification.createdAt))
        add(category.lastWeek, notification)

      else if (isThisMonth(notification.createdAt))
        add(category.lastMonth, notification)

      else
        add(category.older, notification)
    }

    return sections_temp
  }, [ allNotifications?.data?.allNotifications ])



  // seen all
  useEffect(() => {
    const timeoutId = setTimeout(() => seenAll(), 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])



  // layout
  function wrapWithLayout(element: ReactNode) {
    return (
      <FocusLayout className='notifications-page' title={ translations.notifications[language] }>
        { element }
      </FocusLayout>
    )
  }



  // loading
  if (allNotifications.loading)
    return wrapWithLayout(<Notice><LoadingSpinner /></Notice>)



  // error or no data
  if (allNotifications.error || !allNotifications.data)
    return wrapWithLayout(<DataUnavailable />)



  // no notifications
  if (allNotifications.data.allNotifications.length === 0)
    return wrapWithLayout(<Notice>{ translations.noNotifications[language] }</Notice>)



  return wrapWithLayout(
    <Menu className='rounded-box p-2 gap-2'>
      { section(sections, category.new) }

      { section(sections, category.last24h) }

      { section(sections, category.lastWeek) }

      { section(sections, category.lastMonth) }

      { section(sections, category.older) }
    </Menu>
  )
}
