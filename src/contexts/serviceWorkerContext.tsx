import React, { createContext, FC, useContext, ReactNode, useEffect } from 'react'

import useLogger from '@hooks/useLogger'
import useLoadingContext from '@contexts/loadingContext'
import { register } from '@utilities/service-worker'



const ServiceWorkerContext = createContext<ReturnType<typeof useServiceWorker> | null>(null)



interface ServiceWorkerProviderProps {
  children: ReactNode
}



export const ServiceWorkerProvider: FC<ServiceWorkerProviderProps> = ({ children }) => {
  const serviceWorker = useServiceWorker()

  return (
    <ServiceWorkerContext.Provider value={ serviceWorker }>
      { children }
    </ServiceWorkerContext.Provider>
  )
}



export default function useServiceWorkerContext() {
  const context = useContext(ServiceWorkerContext)

  if (context === null) {
    throw new Error('"useServiceWorkerContext" should be used within <ServiceWorkerProvider/>.')
  }

  return context
}



function useServiceWorker() {
  // helpers
  const { debug } = useLogger('useServiceWorker', 180)



  // helpers
  const { addTask } = useLoadingContext()



  // main logic
  function handleSuccess(_: ServiceWorkerRegistration) {
    debug('onSuccess', 'ok')
  }

  function handleUpdate(registration: ServiceWorkerRegistration) {
    const removeTask = addTask('service worker initialization')
    debug('onUpdate', 'updating...')
    const serviceWorker = registration.waiting

    if (!serviceWorker)
      return removeTask()

    // listen for state change
    serviceWorker.onstatechange = () => {
      if (serviceWorker?.state === 'activated' && navigator.serviceWorker.controller) {
        // apply update
        debug('onUpdate', 'reloading...')
        window.location.reload()
      }
    }

    // finish update
    serviceWorker.postMessage({ type: 'SKIP_WAITING' })
    removeTask()
  }

  useEffect(() => {
    debug('useEffect', 'Initializing service worker...')

    register({
      onSuccess: handleSuccess,
      onUpdate: handleUpdate
    })
  }, [])
}
