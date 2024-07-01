import React, { ReactNode, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-daisyui'
import { ArrowLeft, MapPin, Pencil } from 'phosphor-react'

import { FocusLayout } from '@components/layouts/FocusLayout'
import useTitle from '@hooks/useTitle'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { CurrentWeatherStats } from '@components/domain/CurrentWeatherStats'
import { Notice } from '@components/data-state/Notice'
import { AlertsMenu } from '@components/domain/alerts/AlertsMenu'
import { FocusLink } from '@components/layouts/focus-layout/FocusLink'
import useLocationModal from '@hooks/useLocationModal'
import useLocationsContext from '@contexts/locationsContext'
import { AlertsProvider } from '@contexts/alertsContext'
import { DataUnavailable } from '@components/data-state/DataUnavailable'
import translations from '@root/languages/translations'
import useLanguageContext from '@contexts/languageContext'



export default function LocationPage() {
  // helpers
  const { language } = useLanguageContext()
  useTitle(translations.location[language])
  const params = useParams<'id'>()



  // data
  const { locationsQuery } = useLocationsContext()

  const location = useMemo(() => {
    return locationsQuery.data?.locations.filter(l => l.id === Number(params.id))[0]
  }, [ locationsQuery.data?.locations ])



  // edit modal
  const { LocationModal, openModal } = useLocationModal(location)



  // layout
  const Back = <FocusLink Icon={ ArrowLeft } to='/locations' />

  function wrapWithLayout(children: ReactNode) {
    return (
      <FocusLayout className='location-page' contentClassName='relative mb-16' title={ translations.location[language] } elementStart={ Back }>
        { children }
      </FocusLayout>
    )
  }



  // validation of id parameter
  if (!params.id || isNaN(Number(params.id)))
    return wrapWithLayout(<Notice>{ translations.invalidId[language] }</Notice>)



  // loading
  if (locationsQuery.loading)
    return wrapWithLayout(<Notice><LoadingSpinner /></Notice>)



  // error or no data
  if (locationsQuery.error || !location)
    return wrapWithLayout(<DataUnavailable />)



  // location
  const showDescription = location.description
  const Description = <p className='opacity-75'>{ location.description }</p>

  const EditButton = (
    <Button
      className='fixed right-4 bottom-24 shadow-xl'
      color='primary'
      shape='circle'
      size='lg'
      onClick={ openModal }
      endIcon={ <Pencil weight='bold' /> }
    />
  )



  // main element
  const Main = (
    <>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>{ location.name }</h1>

        { showDescription && Description }

        <div className='flex gap-4 justify-start items-center'>
          <MapPin weight='duotone' size={ 24 } />

          <span className='font-medium'>{ location.latitude }, { location.longitude }</span>
        </div>
      </div>

      <CurrentWeatherStats locationId={ Number(params.id) } refetchKey={ `${ location.latitude } ${ location.longitude }` } />

      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold'>{ translations.alertsSet[language] }</h2>

        <AlertsProvider locationId={ location.id as number }>
          <AlertsMenu />
        </AlertsProvider>
      </div>

      { EditButton }

      { LocationModal }
    </>
  )

  return wrapWithLayout(Main)
}
