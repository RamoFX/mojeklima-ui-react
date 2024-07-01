import React, { useState, MouseEvent, useMemo, useEffect } from 'react'
import { Modal, InputGroup, Input, Button, Menu } from 'react-daisyui'
import { Tag, Article, ArrowsVertical, ArrowsHorizontal, Trash, FloppyDisk, MagnifyingGlass, MapPin, Crosshair } from 'phosphor-react'

import useForm, { stringField, numberField } from '@hooks/useForm'
import useSearch from '@hooks/useSearch'
import useWebAlertsContext from '@contexts/webAlertsContext'
import { Notice } from '@components/data-state/Notice'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { useSuggestionsLazyQuery, SuggestionsQueryVariables, Suggestion } from '@graphql/_generated/graphql'
import useLocationsContext, { commonLocation } from '@contexts/locationsContext'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export type existingLocation = Omit<commonLocation, 'alerts'>



export default function useLocationModal(location?: existingLocation) {
  // graphql
  const [ suggestionsQuery, { data: suggestions, loading: suggesting } ] = useSuggestionsLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  })
  const { createLocation, updateLocation, deleteLocation, mutating, creating, updating, deleting } = useLocationsContext()



  // helpers
  const { language } = useLanguageContext()
  const { addAlert } = useWebAlertsContext()
  const mode = typeof location === 'undefined' ? 'create' : 'update'



  // form
  const initialFields = useMemo(() => (
    {

      name: {
        value: location?.name ?? '',
        validator(name) {
          if (name.trim().length === 0)
            return `${ translations.name[language] } ${ translations.requiredMasculine[language] }`

          if (name.trim().length > 127)
            return `${ translations.name[language] } ${ translations.tooLongMasculine[language] }`
        }
      } as stringField<'name'>,

      description: {
        value: location?.description ?? '',
        validator(description) {
          if (description.trim().length > 511)
            return `${ translations.description[language] } ${ translations.tooLongMasculine[language] }`
        }
      } as stringField<'description'>,

      latitude: {
        value: location?.latitude ?? 0,
        validator(latitude) {
          if (-90 > latitude || latitude > +90)
            return translations.invalidValue[language]
        }
      } as numberField<'latitude'>,

      longitude: {
        value: location?.longitude ?? 0,
        validator(longitude) {
          if (-180 > longitude || longitude > +180)
            return translations.invalidValue[language]
        }
      } as numberField<'longitude'>

    }
  ), [ location ])

  const { fields, errors, handleInputChange, handleSubmit, resetErrors } = useForm(
    initialFields,
    handleLocationSubmit,
    mode === 'update'
  )



  // modal state & actions
  const [ modal, setModal ] = useState(false)

  function resetModal() {
    // both
    clear()
    resetErrors()

    if (mode === 'create') {
      fields.name.value = ''
      fields.description.value = ''
      fields.latitude.value = 0
      fields.longitude.value = 0
    } else {
      fields.name.value = location?.name ?? ''
      fields.description.value = location?.description ?? ''
      fields.latitude.value = location?.latitude ?? 0
      fields.longitude.value = location?.longitude ?? 0
    }

    setTab(mode === 'create' ? 'search' : 'form')
  }

  function openModal() {
    resetModal()
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }



  // event handlers
  function handleSuggestionClick(suggestion: Suggestion) {
    // set form fields & switch to form
    fields.description.value = suggestion.formatted
    fields.latitude.value = suggestion.latitude
    fields.longitude.value = suggestion.longitude

    setTab('form')
  }

  function handleMyLocationClick() {
    setWaitingForLocation(true)

    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      // set fields & switch to form
      fields.latitude.value = position.coords.latitude
      fields.longitude.value = position.coords.longitude

      setTab('form')

      setWaitingForLocation(false)
    }, _ => {
      addAlert('error', translations.failedToGetLocation[language])
      setWaitingForLocation(false)
    })
  }

  async function handleLocationSubmit() {
    if (typeof location === 'undefined') {
      await createLocation({
        name: fields.name.value,
        description: fields.description.value,
        latitude: fields.latitude.value,
        longitude: fields.longitude.value
      })
    } else {
      if (!location.id)
        return

      await updateLocation({
        id: location.id,
        name: fields.name.value,
        description: fields.description.value,
        latitude: fields.latitude.value,
        longitude: fields.longitude.value
      })
    }

    closeModal()
  }

  async function handleDeleteClick(_: MouseEvent<HTMLButtonElement>) {
    if (typeof location === 'undefined' || !location.id)
      return

    await deleteLocation(location.id)
  }



  // modal header
  const Title = mode === 'create'
                ? translations.locationCreationTitle[language]
                : translations.locationUpdateTitle[language]

  const OpenSearch = (
    <Button color='ghost' shape='circle' onClick={ () => setTab('search') }>
      <MagnifyingGlass />
    </Button>
  )

  const CloseSearch = (
    <Button color='ghost' shape='circle' onClick={ () => setTab('form') }>
      <MapPin />
    </Button>
  )



  // modal body - form
  const NameInput = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.title[language] }</span>
      </label>

      <InputGroup>
        <span>
          <Tag />
        </span>

        <Input
          type='text'
          name='name'
          value={ fields.name.value }
          color={ errors?.name ? 'error' : 'ghost' }
          placeholder={ translations.title[language] }
          onChange={ handleInputChange }
          className='w-full'
        />
      </InputGroup>

      <span className='text-error'>{ errors?.name ?? '' }</span>
    </>
  )



  const DescriptionInput = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.description[language] } ({ translations.notRequiredMasculine[language] })</span>
      </label>

      <InputGroup>
        <span>
          <Article />
        </span>

        <Input
          type='text'
          name='description'
          value={ fields.description.value }
          color={ errors?.description ? 'error' : 'ghost' }
          placeholder={ translations.description[language] }
          onChange={ handleInputChange }
          className='w-full'
        />
      </InputGroup>

      <span className='text-error'>{ errors?.description ?? '' }</span>
    </>
  )



  const LatitudeInput = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.latitude[language] }</span>
      </label>

      <InputGroup>
        <span>
          <ArrowsVertical />
        </span>

        <Input
          type='number'
          name='latitude'
          min={ -90 }
          max={ +90 }
          step={ 0.000_001 }
          value={ fields.latitude.value }
          color={ errors?.latitude ? 'error' : 'ghost' }
          placeholder={ translations.latitude[language] }
          onChange={ handleInputChange }
          className='w-full'
        />
      </InputGroup>

      <span className='text-error'>{ errors?.latitude ?? '' }</span>
    </>
  )



  const LongitudeInput = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.longitude[language] }</span>
      </label>

      <InputGroup>
        <span>
          <ArrowsHorizontal />
        </span>

        <Input
          type='number'
          name='longitude'
          min={ -180 }
          max={ +180 }
          step={ 0.000_001 }
          value={ fields.longitude.value }
          color={ errors?.longitude ? 'error' : 'ghost' }
          placeholder={ translations.longitude[language] }
          onChange={ handleInputChange }
          className='w-full'
        />
      </InputGroup>

      <span className='text-error'>{ errors?.longitude ?? '' }</span>
    </>
  )



  const ModalBodyForm = (
    <>
      <div>{ NameInput }</div>

      <div>{ DescriptionInput }</div>

      <div>{ LatitudeInput }</div>

      <div>{ LongitudeInput }</div>
    </>
  )



  // modal body - search
  const { SearchBar, query, clear } = useSearch({
    placeholder: translations.searchStreetTownEtc[language],
    AdditionalIcon: Crosshair,
    handleAdditinalClick: handleMyLocationClick,
    lazy: true
  })

  const [ waitingForLocation, setWaitingForLocation ] = useState(false)

  const Loader = <Notice><LoadingSpinner /></Notice>

  const MenuItems = useMemo(() => {
    if (!suggestions)
      return []

    return suggestions.suggestions.map((suggestion, index) => {
      const details = [ suggestion.region, suggestion.countryCode ].filter(Boolean)
                                                                   .join(', ')
      return (
        <Menu.Item key={ index }>
          <button color='ghost' className='items-start' onClick={ () => handleSuggestionClick(suggestion) }>
            <div className='flex flex-col text-left w-full'>
              <span className='font-medium'>{ suggestion.formatted }</span>

              <span className='text-sm opacity-75'>{ details }</span>
            </div>
          </button>
        </Menu.Item>
      )
    })
  }, [ suggestions ])

  useEffect(() => {
    const variables: SuggestionsQueryVariables = { query }

    suggestionsQuery({ variables })
  }, [ query ])

  const NoResults = query.length > 0 && MenuItems.length === 0

  const NoResultsNotice = <Notice>{ translations.noResults[language] }</Notice>

  const ResultMenu = (
    <Menu className='rounded-box p-2 gap-2'>
      { MenuItems }
    </Menu>
  )

  const ModalBodySearch = (
    <>
      { waitingForLocation ? Loader : SearchBar }

      { suggesting ? Loader : NoResults ? NoResultsNotice : ResultMenu }
    </>
  )



  // modal body - tabs
  const [ tab, setTab ] = useState<'form' | 'search'>('search')



  // modal action - delete
  const DeleteIcon = deleting ? <LoadingSpinner /> : <Trash />

  const DeleteAction = (
    <Button disabled={ mutating } startIcon={ DeleteIcon } color='error' onClick={ handleDeleteClick } />
  )



  // modal action - submit
  const SubmitActionText = mode === 'create'
                           ? translations.create[language]
                           : translations.update[language]

  const SubmitIcon = creating || updating ? <LoadingSpinner /> : <FloppyDisk />

  const SubmitAction = (
    <Button disabled={ mutating } startIcon={ SubmitIcon } color='primary' onClick={ handleSubmit }>
      { SubmitActionText }
    </Button>
  )



  // modal action - cancel
  const CancelAction = (
    <Button variant='outline' onClick={ closeModal }>{ translations.cancel[language] }</Button>
  )



  // modal actions - final
  const ModalActions = (
    <Modal.Actions className='flex justify-between'>
      { mode === 'update' ? DeleteAction : <div /> }

      <div className='flex gap-2'>
        { SubmitAction }

        { CancelAction }
      </div>
    </Modal.Actions>
  )



  // modal
  const LocationModal = (
    <Modal open={ modal } onClickBackdrop={ closeModal } className='self-start mt-20'>
      <Modal.Header className='font-bold flex items-center justify-between'>
        { Title }

        { tab === 'form' ? OpenSearch : CloseSearch }
      </Modal.Header>

      <Modal.Body className='flex flex-col justify-between w-full gap-6'>
        { tab === 'form' ? ModalBodyForm : ModalBodySearch }
      </Modal.Body>

      { tab === 'form' && ModalActions }
    </Modal>
  )



  return {
    LocationModal,
    openModal
  }
}
