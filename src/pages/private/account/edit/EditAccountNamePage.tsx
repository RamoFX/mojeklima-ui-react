import React, { useState, useEffect } from 'react'
import { FocusLayout } from '@components/layouts/FocusLayout'
import { useNavigate } from 'react-router-dom'
import { Button, InputGroup, Input } from 'react-daisyui'
import { User } from 'phosphor-react'

import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useForm, { stringField } from '@hooks/useForm'
import { ModalSuccessfulChanges } from '@components/modals/ModalSuccessfulChanges'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import useTitle from '@hooks/useTitle'
import { FocusBackLink } from '@components/layouts/focus-layout/FocusBackLink'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function EditAccountNamePage() {
  // helpers
  const { language } = useLanguageContext()
  const { me, updateName } = usePrivateAccountContext()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isModalShown, setIsModalShown ] = useState(false)
  const [ initialFields, setInitialFields ] = useState({
    name: {
      value: me?.name ?? '',
      validator(name) {
        if (name.length === 0)
          return `${ translations.name[language] } ${ translations.cannotBeEmpty[language] }`

        else if (name.length > 127)
          return `${ translations.name[language] } ${ translations.tooLongNeuter[language] }`
      }
    } as stringField<'name'>
  })
  const { fields, errors, handleInputChange, handleSubmit } = useForm(initialFields, submit)
  useTitle(translations.editData[language])
  const navigate = useNavigate()



  // effects
  useEffect(() => {
    setInitialFields(prev => {
      prev.name.value = me?.name ?? ''
      return { ...prev }
    })
  }, [ me?.name ])



  // main logic
  async function submit() {
    setIsLoading(true)
    await updateName(fields.name.value)
    setIsLoading(false)

    setIsModalShown(true)
  }

  function handleModalClose() {
    setIsModalShown(false)
    navigate('/account/edit')
  }



  return (
    <FocusLayout className='edit-account-name-page'
                 contentClassName='h-full'
                 title={ translations.editData[language] }
                 elementStart={ <FocusBackLink to='/account/edit' /> }>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>{ translations.nameEdit[language] }</h1>

        <p className='opacity-75'>{ translations.typeNewName[language] }</p>
      </div>



      <div className='flex flex-col'>
        <InputGroup>
          <span>
            {
              me === undefined
              ? <LoadingSpinner />
              : <User weight='duotone' size={ 24 } />
            }
          </span>

          <Input
            type='text'
            name='name'
            value={ fields.name.value }
            color={ errors?.name ? 'error' : 'ghost' }
            disabled={ me === undefined }
            placeholder={ translations.name[language] }
            onChange={ handleInputChange }
            className='w-full'
          />
        </InputGroup>

        <span className='text-error'>{ errors?.name ?? '' }</span>
      </div>



      <div className='flex flex-col gap-3 mt-auto m-0'>
        <Button
          color='primary'
          onClick={ handleSubmit }
          disabled={ isLoading }
          className='gap-2'
          startIcon={ isLoading ? <LoadingSpinner /> : null }
        >{ translations.saveChanges[language] }</Button>
      </div>



      <ModalSuccessfulChanges isShown={ isModalShown } hide={ handleModalClose } />
    </FocusLayout>
  )
}
