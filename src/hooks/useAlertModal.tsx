import React, { useState, MouseEvent, ChangeEvent } from 'react'
import { Modal, InputGroup, Input, Button, Select } from 'react-daisyui'
import { Article, Trash, FloppyDisk, CloudSun, MathOperations, ClockClockwise, SlidersHorizontal } from 'phosphor-react'

import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useAlertsContext, { existingAlert } from '@contexts/alertsContext'
import useValidator from '@hooks/useValidator'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function useAlertModal(alert?: existingAlert) {
  // data
  const { createAlert, updateAlert, deleteAlert, creating, updating, deleting, mutating } = useAlertsContext()



  // helpers
  const { language } = useLanguageContext()
  const mode = typeof alert === 'undefined' ? 'create' : 'update'



  // form - criteria
  const criteriaDefault = 'TEMPERATURE'
  const [ criteria, setCriteria ] = useState(alert?.criteria ?? criteriaDefault)

  function handleCriteriaChange(event: ChangeEvent<HTMLSelectElement>) {
    setCriteria(event.target.value)
  }



  // form - comparator
  const comparatorDefault = 'LESS_THAN'
  const [ comparator, setComparator ] = useState(alert?.comparator ?? comparatorDefault)

  function handleComparatorChange(event: ChangeEvent<HTMLSelectElement>) {
    setComparator(event.target.value)
  }



  // form - value
  const valueDefault = 0
  const [ value, setValue ] = useState(alert?.value ?? valueDefault)

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(
      Number(event.target.value)
    )
  }



  // form - update frequency
  const updateFrequencyDefault = 1
  const [ updateFrequency, setUpdateFrequency ] = useState(alert?.updateFrequency ?? updateFrequencyDefault)
  const updateFrequencyValidator = useValidator(updateFrequency, uf => {
    if (uf < 1)
      return `${ translations.shouldBeGreaterThan[language] } 0`

    else if (uf >= 24 * 7)
      return `${ translations.shouldBeGreaterThan[language] } 168`
  })

  function handleUpdateFrequencyChange(event: ChangeEvent<HTMLInputElement>) {
    setUpdateFrequency(
      Number(event.target.value)
    )
  }



  // form - message
  const messageDefault = ''
  const [ message, setMessage ] = useState(alert?.message ?? messageDefault)
  const messageValidator = useValidator(message, m => {
    if (m.trim().length === 0)
      return `${ translations.message[language] } ${ translations.requiredFeminine[language] }`

    else if (m.trim().length > 511)
      return `${ translations.message[language] } ${ translations.tooLongFeminine[language] }`
  })

  function handleMessageChange(event: ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value)
  }



  // form helpers
  function validateForm() {
    const validationResult = [
      updateFrequencyValidator.validate(),
      messageValidator.validate()
    ]

    return validationResult.every(vr => typeof vr === 'undefined')
  }

  function resetErrors() {
    updateFrequencyValidator.resetError()
    messageValidator.resetError()
  }



  // modal state & actions
  const [ modal, setModal ] = useState(false)

  function resetModal() {
    // both
    resetErrors()

    setCriteria(alert?.criteria ?? criteriaDefault)
    setComparator(alert?.comparator ?? comparatorDefault)
    setValue(alert?.value ?? valueDefault)
    setUpdateFrequency(alert?.updateFrequency ?? updateFrequencyDefault)
    setMessage(alert?.message ?? messageDefault)
  }

  function openModal() {
    resetModal()
    setModal(true)
  }

  function closeModal() {
    setModal(false)
  }



  // event handlers
  async function handleSubmit() {
    const validationResult = validateForm()

    if (!validationResult)
      return

    if (typeof alert === 'undefined') {
      await createAlert({
        isEnabled: true,
        criteria,
        comparator,
        value,
        updateFrequency,
        message
      })
    } else {
      if (!alert.id)
        return

      await updateAlert({
        id: alert.id,
        isEnabled: true,
        criteria,
        comparator,
        value,
        updateFrequency,
        message
      })
    }

    closeModal()
  }

  async function handleDeleteClick(_: MouseEvent<HTMLButtonElement>) {
    if (typeof alert === 'undefined' || !alert.id)
      return

    await deleteAlert(alert.id)
  }



  // modal header
  const Title = mode === 'create'
                ? translations.alertCreationTitle[language]
                : translations.alertUpdateTitle[language]



  // modal body - form
  const CriteriaField = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.criteria[language] }</span>
      </label>

      <InputGroup className='pr-14'>
        <span>
          <CloudSun />
        </span>

        <Select
          color='ghost'
          onChange={ handleCriteriaChange }
          value={ criteria }
          className='w-full'
        >
          <Select.Option value='TEMPERATURE'>{ translations.temperature[language] }</Select.Option>
          <Select.Option value='HUMIDITY'>{ translations.humidity[language] }</Select.Option>
          <Select.Option value='WIND_SPEED'>{ translations.windSpeed[language] }</Select.Option>
          <Select.Option value='PRESSURE'>{ translations.pressure[language] }</Select.Option>
        </Select>
      </InputGroup>
    </>
  )



  const ComparatorField = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.comparator[language] }</span>
      </label>

      <InputGroup className='pr-14'>
        <span>
          <MathOperations />
        </span>

        <Select
          color='ghost'
          onChange={ handleComparatorChange }
          value={ comparator }
          className='w-full'
        >
          <Select.Option value='LESS_THAN'>&lt;</Select.Option>
          <Select.Option value='LESS_THAN_OR_EQUAL_TO'>&le;</Select.Option>
          <Select.Option value='EQUAL_TO'> =</Select.Option>
          <Select.Option value='GREATER_THAN_OR_EQUAL_TO'>&ge;</Select.Option>
          <Select.Option value='GREATER_THAN'>&gt;</Select.Option>
        </Select>
      </InputGroup>
    </>
  )



  const ValueField = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.value[language] }</span>
      </label>

      <InputGroup>
        <span>
          <SlidersHorizontal />
        </span>

        <Input
          type='number'
          step={ 0.01 }
          value={ value }
          color='ghost'
          placeholder={ translations.value[language] }
          onChange={ handleValueChange }
          className='w-full'
        />
      </InputGroup>
    </>
  )



  const UpdateFrequencyField = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.updateFrequency[language] }</span>
      </label>

      <InputGroup>
        <span>
          <ClockClockwise />
        </span>

        <Input
          type='number'
          min={ 1 }
          max={ 24 * 7 - 1 }
          step={ 1 }
          value={ updateFrequency }
          color={ updateFrequencyValidator.error ? 'error' : 'ghost' }
          placeholder={ translations.updateFrequency[language] }
          onChange={ handleUpdateFrequencyChange }
          className='w-full'
        />
      </InputGroup>

      <span className='text-error'>{ updateFrequencyValidator.error ?? '' }</span>
    </>
  )



  const MessageField = (
    <>
      <label className='label'>
        <span className='label-text'>{ translations.message[language] }</span>
      </label>

      <InputGroup>
        <span>
          <Article />
        </span>

        <Input
          type='text'
          name='description'
          value={ message }
          color={ messageValidator.error ? 'error' : 'ghost' }
          placeholder={ translations.message[language] }
          onChange={ handleMessageChange }
          className='w-full'
        />
      </InputGroup>

      <span className='text-error'>{ messageValidator.error ?? '' }</span>
    </>
  )



  // modal action - delete
  const DeleteIcon = deleting ? <LoadingSpinner /> : <Trash />

  const DeleteAction = (
    <Button disabled={ mutating } startIcon={ DeleteIcon } color='error' onClick={ handleDeleteClick } />
  )



  // modal action - submit
  const SubmitActionText = mode === 'create' ? translations.create[language] : translations.update[language]

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
    <>
      { mode === 'update' ? DeleteAction : <div /> }

      <div className='flex gap-2'>
        { SubmitAction }

        { CancelAction }
      </div>
    </>
  )



  // modal
  const AlertModal = (
    <Modal open={ modal } onClickBackdrop={ closeModal }>
      <Modal.Header className='font-bold flex items-center justify-between'>
        { Title }
      </Modal.Header>

      <Modal.Body className='flex flex-col justify-between w-full gap-6'>
        <div>{ CriteriaField }</div>

        <div>{ ComparatorField }</div>

        <div>{ ValueField }</div>

        <div>{ UpdateFrequencyField }</div>

        <div>{ MessageField }</div>
      </Modal.Body>

      <Modal.Actions className='flex justify-between'>
        { ModalActions }
      </Modal.Actions>
    </Modal>
  )



  return {
    AlertModal,
    openModal
  }
}
