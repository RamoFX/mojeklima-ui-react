import React, { useState, useEffect } from 'react'
import validator from 'validator'
import { useSearchParams, useNavigate, Link as RouterLink } from 'react-router-dom'
import { Input, Button, InputGroup } from 'react-daisyui'
import { Envelope, User } from 'phosphor-react'

import { Logotype } from '@components/brand/Logotype'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useForm from '@hooks/useForm'
import useAuthenticationContext from '@contexts/authenticationContext'
import { EmptyLayout } from '@components/layouts/EmptyLayout'
import useThemeContext, { Theme } from '@contexts/themeContext'
import { ModalAccountCreated } from '@components/modals/ModalAccountCreated'
import usePublicAccountContext from '@contexts/publicAccountContext'
import useTitle from '@hooks/useTitle'

import weatherAppLight from '@assets/weather-app/light.svg'
import weatherAppDark from '@assets/weather-app/dark.svg'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function CreateAccountPage() {
  // helpers
  const { language } = useLanguageContext()
  const { theme } = useThemeContext()
  const [ params ] = useSearchParams()
  const { fields, errors, handleInputChange, handleSubmit } = useForm({
    email: {
      value: '',
      validator: email => {
        if (email.length === 0)
          return `${ translations.email[language] } ${ translations.requiredMasculine[language] }`

        if (!validator.isEmail(email))
          return translations.invalidEmailFormat[language]
      }
    },
    name: {
      value: '',
      validator: name => {
        if (name.length === 0)
          return `${ translations.name[language] } ${ translations.requiredNeuter[language] }`

        else if (name.length > 127)
          return `${ translations.name[language] } ${ translations.tooLongNeuter[language] }`
      }
    }
  }, submit)
  const { logout } = useAuthenticationContext()
  const { register } = usePublicAccountContext()
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)
  useTitle(translations.createAccount[language])



  // form
  async function submit(): Promise<void> {
    setIsLoading(true)
    const ok = await register(fields.name.value, fields.email.value)
    setIsLoading(false)

    if (!ok)
      return

    showModal()
  }



  // modal
  const [ isModalShown, setIsModalShown ] = useState(false)

  function showModal() {
    setIsModalShown(true)
  }

  function hideModal() {
    setIsModalShown(false)

    const loginBase = `/login?email=${ encodeURIComponent(fields.email.value) }`
    const to = getReturnUrl().length > 0
               ? `${ loginBase }&return=${ encodeURIComponent(getReturnUrl()) }`
               : loginBase

    navigate(to)
  }



  // effects
  useEffect(() => {
    logout()
  }, [])



  // helpers
  function getReturnUrl() {
    return params.get('return') ?? ''
  }



  return (
    <EmptyLayout className='login-page text-center'>
      <div className='flex flex-col gap-8'>
        <Logotype />

        <h1 className='text-4xl font-bold'>{ translations.discoverThePossibilities[language] }</h1>
      </div>



      <div className='flex justify-center w-full'>
        <img
          className='w-1/2'
          src={ theme === Theme.dark ? weatherAppDark : weatherAppLight }
          alt={ translations.pictureDiscoverThePossibilities[language] }
        />
      </div>



      <div className='flex flex-col justify-between w-full gap-6'>
        <div className='flex flex-col'>
          <InputGroup className=''>
            <span>
              <User weight='duotone' size={ 24 } />
            </span>

            <Input
              type='name'
              name='name'
              value={ fields.name.value }
              color={ errors?.name ? 'error' : 'ghost' }
              placeholder={ translations.name[language] }
              onChange={ handleInputChange }
              className='w-full'
            />
          </InputGroup>

          <span className='text-error'>{ errors?.name ?? '' }</span>
        </div>

        <div className='flex flex-col'>
          <InputGroup className=''>
            <span>
              <Envelope weight='duotone' size={ 24 } />
            </span>

            <Input
              type='email'
              name='email'
              value={ fields.email.value }
              color={ errors?.email ? 'error' : 'ghost' }
              placeholder={ translations.email[language] }
              onChange={ handleInputChange }
              className='w-full'
            />
          </InputGroup>

          <span className='text-error'>{ errors?.email ?? '' }</span>
        </div>
      </div>



      <div className='flex flex-col gap-3 mt-auto'>
        <Button
          color='primary'
          onClick={ handleSubmit }
          disabled={ isLoading }
          className='gap-2'
          startIcon={ isLoading ? <LoadingSpinner /> : null }
        >
          { translations.createAccount[language] }
        </Button>

        <p className='text-center opacity-80'>{ translations.or[language] }</p>

        <RouterLink to={ getReturnUrl().length > 0 ? `/login?return=${ encodeURIComponent(getReturnUrl()) }` : '/login' }>
          <Button color='primary' variant='outline' className='w-full'>
            { translations.logIn[language] }
          </Button>
        </RouterLink>
      </div>



      <ModalAccountCreated isShown={ isModalShown } hide={ hideModal } />
    </EmptyLayout>
  )
}
