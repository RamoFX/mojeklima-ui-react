import React, { createContext, FC, useContext, ReactNode } from 'react'

import { useCreateLocationMutation, useUpdateLocationMutation, useDeleteLocationMutation, useLocationsQuery, Location } from '@graphql/_generated/graphql'
import useWebAlertsContext from '@contexts/webAlertsContext'
import { useNavigate } from 'react-router-dom'
import { NoDataError } from '@errors/NoDataError'
import translations from '@root/languages/translations'
import useLanguageContext from '@contexts/languageContext'



const LocationsContext = createContext<ReturnType<typeof useLocations> | null>(null)



interface LocationsProviderProps {
  children: ReactNode
}



export const LocationsProvider: FC<LocationsProviderProps> = ({ children }) => {
  const locations = useLocations()

  return (
    <LocationsContext.Provider value={ locations }>
      { children }
    </LocationsContext.Provider>
  )
}



export default function useLocationsContext() {
  const context = useContext(LocationsContext)

  if (context === null) {
    throw new Error('"useLocationsContext" should be used within <LocationsProvider/>.')
  }

  return context
}



export type commonLocation = Omit<Location, 'account' | 'alerts'>
export type existingLocation = commonLocation & { id: number }
export type updatedLocation = Omit<existingLocation, 'createdAt' | 'updatedAt'>
export type newLocation = Omit<updatedLocation, 'id'>



function useLocations() {
  // helpers
  const { language } = useLanguageContext()
  const { addAlert } = useWebAlertsContext()
  const navigate = useNavigate()



  // graphql
  const locationsQuery = useLocationsQuery()
  const [ createLocationMutation, { loading: creating } ] = useCreateLocationMutation()
  const [ updateLocationMutation, { loading: updating } ] = useUpdateLocationMutation()
  const [ deleteLocationMutation, { loading: deleting } ] = useDeleteLocationMutation()



  // main logic
  const mutating = creating || updating || deleting

  async function createLocation(newLocation: newLocation) {
    await createLocationMutation({ variables: newLocation })
      .then(({ data }) => {
        if (!data || !data.createLocation)
          throw new NoDataError()

        locationsQuery.updateQuery(({ locations }) => {
          return {
            locations: [
              ...locations,
              data.createLocation
            ]
          }
        })

        addAlert('success', translations.created[language])
      })
      .catch((error: Error) => {
        addAlert('error', translations.failedToCreate[language])
        console.warn('Caught error:', error)
      })
  }

  async function updateLocation(updatedLocation: updatedLocation) {
    await updateLocationMutation({ variables: updatedLocation })
      .then(({ data }) => {
        if (!data || !data.updateLocation)
          throw new NoDataError()

        locationsQuery.updateQuery(({ locations }) => {
          return {
            locations: locations.map(
              l => l.id === updatedLocation.id ? { ...l, ...updatedLocation } : l
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

  async function deleteLocation(id: number) {
    const variables = { id }

    await deleteLocationMutation({ variables })
      .then(({ data }) => {
        if (!data || !data.deleteLocation)
          throw new NoDataError()

        locationsQuery.updateQuery(({ locations }) => {
          return {
            locations: locations.filter(l => l.id !== id)
          }
        })

        addAlert('success', translations.deleted[language], [ '/locations' ])
        navigate('/locations')
      })
      .catch((error: Error) => {
        addAlert('error', translations.failedToDelete[language])
        console.warn('Caught error:', error)
      })
  }



  return {
    locationsQuery,
    createLocation,
    updateLocation,
    deleteLocation,
    mutating,
    creating,
    updating,
    deleting
  }
}
