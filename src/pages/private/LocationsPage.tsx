import React, { ReactNode, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'react-daisyui'
import { MapPin, Plus } from 'phosphor-react'

import { FocusLayout } from '@components/layouts/FocusLayout'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { Notice } from '@components/data-state/Notice'
import { DataUnavailable } from '@components/data-state/DataUnavailable'
import useSearch from '@hooks/useSearch'
import useTitle from '@hooks/useTitle'
import useThemeContext, { Theme } from '@contexts/themeContext'

import noDataDark from '@assets/no-data/dark.svg'
import noDataLight from '@assets/no-data/light.svg'
import useLocationModal from '@hooks/useLocationModal'
import useLocationsContext from '@contexts/locationsContext'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function LocationsPage() {
  // helpers
  const { language } = useLanguageContext()
  useTitle(translations.locations[language])
  const { theme } = useThemeContext()



  // data
  const { locationsQuery: { data, loading, error } } = useLocationsContext()



  // search locations
  const { SearchBar, query } = useSearch()

  const MenuItems = useMemo(() => {
    if (!data)
      return []

    return data.locations.map(location => {
                 const name = location.name.toLowerCase()
                 const description = location.description.toLowerCase()
                 const srch = query.toLowerCase()

                 const omit = !name.includes(srch) && !description.includes(srch)

                 if (omit)
                   return null

                 return (
                   <Menu.Item key={ location.id }>
                     <Link to={ `/locations/${ location.id }` } className='items-start'>
                       <MapPin weight='duotone' size={ 24 } className='flex-shrink-0' />

                       <div className='flex flex-col text-left w-full'>
                         <span className='font-medium'>{ location.name }</span>

                         <span className='text-sm opacity-75'>{ location.description }</span>
                       </div>
                     </Link>
                   </Menu.Item>
                 )
               })
               .filter(Boolean)
  }, [ query, data, loading, error ])



  // layout
  function wrapWithLayout(element: ReactNode) {
    return (
      <FocusLayout className='locations-page' title={ translations.locations[language] } contentClassName={ `relative ${ query.length === 0 ? 'mb-16' : '' }` }>
        { element }
      </FocusLayout>
    )
  }



  // location creation
  const { LocationModal, openModal } = useLocationModal()

  const CreationButton = query.length === 0 && (
    <Button
      className='fixed right-4 bottom-24 shadow-xl'
      color='primary'
      shape='circle'
      size='lg'
      onClick={ openModal }
      endIcon={ <Plus weight='bold' size={ 24 } /> }
    />
  )

  const CreateFirstLocationButton = (
    <Button
      color='primary'
      onClick={ openModal }
      endIcon={ <Plus weight='bold' size={ 24 } /> }
    >
      { translations.create[language] }
    </Button>
  )



  // loading
  if (loading)
    return wrapWithLayout(<Notice><LoadingSpinner /></Notice>)



  // error or no data
  if (error || !data)
    return wrapWithLayout(<DataUnavailable />)



  // no locations
  if (data.locations.length === 0)
    return wrapWithLayout(
      <div className='flex flex-col gap-8 justify-center items-center h-full'>
        <img src={ theme === Theme.dark ? noDataDark : noDataLight } alt={ translations.pictureNoLocations[language] } className='w-2/3' />

        <h1 className='text-4xl font-bold text-center'>{ translations.locations[language] }</h1>

        { CreateFirstLocationButton }

        { LocationModal }
      </div>
    )



  // main elements
  const LocationsMenu = (
    <Menu className='rounded-box p-2 gap-2'>
      { MenuItems }
    </Menu>
  )

  const NoResult = <Notice>{ translations.noItems[language] }</Notice>

  return wrapWithLayout(
    <>
      { SearchBar }

      { MenuItems.length > 0 ? LocationsMenu : NoResult }

      { CreationButton }

      { LocationModal }
    </>
  )
}
