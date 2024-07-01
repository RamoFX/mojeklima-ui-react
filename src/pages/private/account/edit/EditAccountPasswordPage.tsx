import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoolean } from 'react-use'
import { Button, InputGroup, Input } from 'react-daisyui'
import { Key, Eye, EyeSlash } from 'phosphor-react'

import { FocusLayout } from '@components/layouts/FocusLayout'
import { ModalSuccessfulChanges } from '@components/modals/ModalSuccessfulChanges'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useForm from '@hooks/useForm'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import useTitle from '@hooks/useTitle'
import { FocusBackLink } from '@components/layouts/focus-layout/FocusBackLink'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function EditAccountPasswordPage() {
  // helpers
  const { language } = useLanguageContext()
  const { updatePassword } = usePrivateAccountContext()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isModalShown, setIsModalShown ] = useState(false)
  const [ isPasswordHidden, toggleIsPasswordHidden ] = useBoolean(true)
  const [ isPasswordCheckHidden, toggleIsPasswordCheckHidden ] = useBoolean(true)
  const { fields, errors, handleInputChange, handleSubmit } = useForm({
    password: {
      value: '',
      validator(password) {
        if (password.length === 0)
          return `${ translations.password[language] } ${ translations.cannotBeEmpty[language] }`
      }
    },
    passwordCheck: {
      value: '',
      validator: (passwordCheck, fields) => {
        if (passwordCheck !== fields.password.value)
          return translations.passwordsShouldMatch[language]
      }
    }
  }, submit)
  useTitle(translations.editData[language])
  const navigate = useNavigate()



  // main logic
  async function submit() {
    setIsLoading(true)
    await updatePassword(fields.password.value)
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
        <h1 className='text-2xl font-bold'>{ translations.passwordEdit[language] }</h1>

        <p className='opacity-75'>{ translations.typeNewPassword[language] }</p>
      </div>



      <div className='flex flex-col gap-6'>
        <div className='relative'>
          <div>
            <InputGroup>
              <span>
                <Key weight='duotone' size={ 24 } />
              </span>

              <Input
                type={ isPasswordHidden ? 'password' : 'text' }
                name='password'
                value={ fields.password.value }
                color={ errors?.password ? 'error' : 'ghost' }
                placeholder={ translations.password[language] }
                onChange={ handleInputChange }
                className='w-full'
              />
            </InputGroup>

            <span className='text-error'>{ errors?.password ?? '' }</span>
          </div>

          <div
            className='absolute right-0 top-0 p-3 cursor-pointer'
            onClick={ toggleIsPasswordHidden }
          >
            {
              isPasswordHidden
              ? <Eye weight='duotone' size={ 24 } />
              : <EyeSlash weight='duotone' size={ 24 } />
            }
          </div>
        </div>



        <div className='relative'>
          <div>
            <InputGroup>
              <span>
                <Key weight='duotone' size={ 24 } />
              </span>

              <Input
                type={ isPasswordCheckHidden ? 'password' : 'text' }
                name='passwordCheck'
                value={ fields.passwordCheck.value }
                color={ errors?.passwordCheck ? 'error' : 'ghost' }
                placeholder={ translations.passwordCheck[language] }
                onChange={ handleInputChange }
                className='w-full'
              />
            </InputGroup>

            <span className='text-error'>{ errors?.passwordCheck ?? '' }</span>
          </div>

          <div
            className='absolute right-0 top-0 p-3 cursor-pointer'
            onClick={ toggleIsPasswordCheckHidden }
          >
            {
              isPasswordCheckHidden
              ? <Eye weight='duotone' size={ 24 } />
              : <EyeSlash weight='duotone' size={ 24 } />
            }
          </div>
        </div>
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
