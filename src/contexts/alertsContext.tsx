import React, { createContext, FC, useContext, ReactNode } from 'react'
import { useAlertsQuery, useToggleAlertMutation, useUpdateAlertMutation, useCreateAlertMutation, useDeleteAlertMutation, Alert, useAllAlertsCountQuery } from '@graphql/_generated/graphql'
import { NoDataError } from '@errors/NoDataError'
import useWebAlertsContext from '@contexts/webAlertsContext'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



const AlertsContext = createContext<ReturnType<typeof useAlerts> | null>(null)



interface AlertsProviderProps {
  children: ReactNode,
  locationId: number
}



export const AlertsProvider: FC<AlertsProviderProps> = ({ children, locationId }) => {
  const alerts = useAlerts(locationId)

  return (
    <AlertsContext.Provider value={ alerts }>
      { children }
    </AlertsContext.Provider>
  )
}



export default function useAlertsContext() {
  const context = useContext(AlertsContext)

  if (context === null) {
    throw new Error('"useAlertsContext" should be used within <AlertsProvider/>.')
  }

  return context
}



export type commonAlert = Omit<Alert, 'location' | 'notifications'>
export type existingAlert = commonAlert & { id: number }
export type updatedAlert = Omit<existingAlert, 'createdAt' | 'updatedAt'>
export type newAlert = Omit<updatedAlert, 'id'>



function useAlerts(locationId: number) {
  // helpers
  const { language } = useLanguageContext()
  const { addAlert } = useWebAlertsContext()



  // graphql
  const alertsQuery = useAlertsQuery({
    variables: { locationId }
  })
  const allAlertsCountQuery = useAllAlertsCountQuery()
  const [ createAlertMutation, { loading: creating } ] = useCreateAlertMutation()
  const [ toggleAlertMutation, { loading: toggling } ] = useToggleAlertMutation()
  const [ updateAlertMutation, { loading: updating } ] = useUpdateAlertMutation()
  const [ deleteAlertMutation, { loading: deleting } ] = useDeleteAlertMutation()



  // main logic
  const mutating = creating || updating || deleting

  async function createAlert(newAlert: newAlert) {
    const variables = {
      locationId,
      ...newAlert
    }

    await createAlertMutation({ variables })
      .then(({ data }) => {
        if (!data || !data.createAlert)
          throw new NoDataError()

        // update alerts
        alertsQuery.updateQuery(({ locationAlerts }) => {
          return {
            locationAlerts: [
              ...locationAlerts,
              data.createAlert
            ]
          }
        })

        // update alerts count
        allAlertsCountQuery.updateQuery(({ allAlertsCount }) => {
          return {
            allAlertsCount: allAlertsCount + 1
          }
        })

        addAlert('success', translations.created[language])
      })
      .catch((error: Error) => {
        addAlert('error', translations.failedToCreate[language])
        console.warn('Caught error:', error)
      })
  }

  async function toggleAlert(id: number, isEnabled: boolean) {
    const variables = { id, isEnabled }

    await toggleAlertMutation({ variables })
      .then(({ data }) => {
        if (!data || !data.toggleAlert)
          throw new NoDataError()

        alertsQuery.updateQuery(({ locationAlerts }) => {
          return {
            locationAlerts: locationAlerts.map(
              a => a.id === id ? { ...a, ...toggleAlert } : a
            )
          }
        })

        addAlert('success', isEnabled ? translations.enabled[language] : translations.disabled[language])
      })
      .catch((error: Error) => {
        addAlert('error', translations.failed[language])
        console.warn('Caught error:', error)
      })
  }

  async function updateAlert(updatedAlert: updatedAlert) {
    await updateAlertMutation({ variables: updatedAlert })
      .then(({ data }) => {
        if (!data || !data.updateAlert)
          throw new NoDataError()

        alertsQuery.updateQuery(({ locationAlerts }) => {
          return {
            locationAlerts: locationAlerts.map(
              a => a.id === updatedAlert.id ? { ...a, ...updatedAlert } : a
            )
          }
        })

        addAlert('success', translations.edited[language])
      })
      .catch((error: Error) => {
        addAlert('error', translations.failedToEdit[language])
        console.warn('Caught error:', error)
      })
  }

  async function deleteAlert(id: number) {
    const variables = { id }

    await deleteAlertMutation({ variables })
      .then(({ data }) => {
        if (!data || !data.deleteAlert)
          throw new NoDataError()

        // update alerts
        alertsQuery.updateQuery(({ locationAlerts }) => {
          return {
            locationAlerts: locationAlerts.filter(a => a.id !== id)
          }
        })

        // update alerts count
        allAlertsCountQuery.updateQuery(({ allAlertsCount }) => {
          return {
            allAlertsCount: allAlertsCount - 1
          }
        })

        addAlert('success', translations.deleted[language])
      })
      .catch((error: Error) => {
        addAlert('error', translations.failedToDelete[language])
        console.warn('Caught error:', error)
      })
  }



  return {
    alertsQuery,
    allAlertsCountQuery,
    createAlert,
    toggleAlert,
    updateAlert,
    deleteAlert,
    creating,
    toggling,
    updating,
    deleting,
    mutating
  }
}
