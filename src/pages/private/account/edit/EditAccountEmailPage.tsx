import React, { useState, useEffect } from 'react'
import { FocusLayout } from '@components/layouts/FocusLayout'
import { useNavigate } from 'react-router-dom'
import { Button, InputGroup, Input } from 'react-daisyui'
import { Envelope } from 'phosphor-react'

import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useForm, { stringField } from '@hooks/useForm'
import { ModalSuccessfulChanges } from '@components/modals/ModalSuccessfulChanges'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import useTitle from '@hooks/useTitle'
import { FocusBackLink } from '@components/layouts/focus-layout/FocusBackLink'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function EditAccountEmailPage() {
  // helpers
  const { language } = useLanguageContext()
  const { me, updateEmail } = usePrivateAccountContext()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isModalShown, setIsModalShown ] = useState(false)
  const [ initialFields, setInitialFields ] = useState({
    email: {
      value: me?.email ?? '',
      validator(email) {
        if (email.length === 0)
          return `${ translations.email[language] } ${ translations.requiredMasculine[language] }`
      }
    } as stringField<'name'>
  })
  const { fields, errors, handleInputChange, handleSubmit } = useForm(initialFields, submit)
  useTitle(translations.editData[language])
  const navigate = useNavigate()



  // effects
  useEffect(() => {
    setInitialFields(prev => {
      prev.email.value = me?.email ?? ''
      return { ...prev }
    })
  }, [ me?.email ])



  // main logic
  async function submit() {
    setIsLoading(true)
    const success = await updateEmail(fields.email.value)
    setIsLoading(false)

    if (!success)
      return

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
        <h1 className='text-2xl font-bold'>{ translations.emailEdit[language] }</h1>

        <p className='opacity-75'>{ translations.typeNewEmail[language] }</p>
      </div>



      <div className='flex flex-col'>
        <InputGroup>
          <span>
            {
              me === undefined
              ? <LoadingSpinner />
              : <Envelope weight='duotone' size={ 24 } />
            }
          </span>

          <Input
            type='email'
            name='email'
            value={ fields.email.value }
            color={ errors?.email ? 'error' : 'ghost' }
            disabled={ me === undefined }
            placeholder={ translations.email[language] }
            onChange={ handleInputChange }
            className='w-full bg-transparent focus:bg-transparent'
          />
        </InputGroup>

        <span className='text-error'>{ errors?.email ?? '' }</span>
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
