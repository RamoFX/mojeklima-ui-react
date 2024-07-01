import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import '@styles/global.css'
import Application from './Application'
import { register } from '@utilities/service-worker'



// disable react dev tools in production
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}



// creating and rendering react root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(<Application />)



// register service worker
register({
  onUpdate(registration: ServiceWorkerRegistration) {
    const serviceWorker = registration.waiting

    if (!serviceWorker)
      return

    // listen for state change
    serviceWorker.onstatechange = () => {
      if (serviceWorker?.state === 'activated' && navigator.serviceWorker.controller) {
        // apply update
        window.location.reload()
      }
    }

    // finish update
    serviceWorker.postMessage({ type: 'SKIP_WAITING' })
  }
})
