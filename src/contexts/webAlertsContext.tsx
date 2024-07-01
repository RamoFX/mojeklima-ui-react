import React, { createContext, FC, useContext, ReactNode, useState } from 'react'
import { AlertProps, Toast, Alert } from 'react-daisyui'
import { Info, Check, Warning, WarningCircle } from 'phosphor-react'



const WebAlertsContext = createContext<ReturnType<typeof useWebAlerts> | null>(null)



interface WebAlertsProviderProps {
  children: ReactNode
}



export const WebAlertsProvider: FC<WebAlertsProviderProps> = ({ children }) => {
  const webAlerts = useWebAlerts()

  return (
    <WebAlertsContext.Provider value={ webAlerts }>
      { children }
    </WebAlertsContext.Provider>
  )
}



export default function useWebAlertsContext() {
  const context = useContext(WebAlertsContext)

  if (context === null) {
    throw new Error('"useAlertsContext" should be used within <WebAlertsProvider/>.')
  }

  return context
}



export interface WebAlertData {
  guid: string,
  content: ReactNode,
  status: AlertProps['status'],
  icon: AlertProps['icon'],
  keep?: Array<string>
}



function useWebAlerts() {
  const [ alerts, setAlerts ] = useState<WebAlertData[]>([])



  // main logic
  function addAlert(status: WebAlertData['status'], content: WebAlertData['content'], keep?: WebAlertData['keep']) {
    const guid = crypto.randomUUID()
    let AlertIcon: typeof Info

    switch (status) {
      case 'success':
        AlertIcon = Check
        break

      case 'warning':
        AlertIcon = Warning
        break

      case 'error':
        AlertIcon = WarningCircle
        break

      case 'info':
      default:
        AlertIcon = Info
        break
    }

    setAlerts((alerts) => [
      ...alerts,
      {
        guid,
        status,
        icon: <AlertIcon weight='regular' size={ 32 } />,
        content,
        keep
      }
    ])

    setTimeout(() => removeAlert(guid), 10_000)
  }

  function removeAlert(guid: string) {
    setAlerts(alerts => alerts.filter(alert => alert.guid !== guid))
  }

  function removeAll(location: string) {
    setAlerts(prev => prev.filter(alert => alert.keep?.includes(location)))
  }



  // elements
  const Alerts = alerts.length > 0 && (
    <Toast className='w-full pointer-events-none' vertical='top' style={ { zIndex: 1000 } }>
      { alerts.map((alert, index) => (
        <Alert
          key={ index }
          status={ alert.status }
          icon={ alert.icon }
          onClick={ () => removeAlert(alert.guid) }
          className='items-stretch pointer-events-auto'
        >
          <div className='w-full text-left'>
            <p className='font-semibold'>{ alert.content }</p>
          </div>
        </Alert>
      )) }
    </Toast>
  )



  return {
    addAlert,
    removeAll,
    Alerts
  }
}
