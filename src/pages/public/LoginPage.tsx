import React, { useState, useEffect } from 'react'
import { Link as RouterLink, useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useBoolean } from 'react-use'
import validator from 'validator'
import { Input, Button, Checkbox, InputGroup } from 'react-daisyui'
import { Eye, EyeSlash, Envelope, Key } from 'phosphor-react'

import { Logotype } from '@components/brand/Logotype'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useAuthenticationContext from '@contexts/authenticationContext'
import { EmptyLayout } from '@components/layouts/EmptyLayout'
import useThemeContext, { Theme } from '@contexts/themeContext'
import usePublicAccountContext from '@contexts/publicAccountContext'
import useForm, { stringField } from '@hooks/useForm'
import useTitle from '@hooks/useTitle'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'

import welcomeBackLight from '@assets/welcome-back/light.svg'
import welcomeBackDark from '@assets/welcome-back/dark.svg'



export default function LoginPage() {
  // helpers
  const { language } = useLanguageContext()
  const { theme } = useThemeContext()
  const [ params ] = useSearchParams()
  const { fields, errors, handleInputChange, handleSubmit } = useForm({
    email: {
      value: params.get('email') ?? '',
      validator(email) {
        if (email.length === 0)
          return `${ translations.email[language] } ${ translations.requiredMasculine[language] }`

        if (!validator.isEmail(email))
          return translations.invalidEmailFormat[language]
      }
    } as stringField<'email'>,
    password: {
      value: '',
      validator: password => {
        if (password.length === 0)
          return `${ translations.password[language] } ${ translations.requiredNeuter[language] }`
      }
    },
    remember: {
      value: true
    }
  }, submit)
  const [ isPasswordHidden, toggleIsPasswordHidden ] = useBoolean(true)
  const { isAuthenticated } = useAuthenticationContext()
  const { login } = usePublicAccountContext()
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)
  useTitle(translations.logIn[language])



  // effects
  useEffect(() => {
    if (isAuthenticated)
      navigate('/')
  }, [])



  // helpers
  function getReturnUrl() {
    return params.get('return') ?? ''
  }



  // form
  async function submit(): Promise<void> {
    setIsLoading(true)
    const ok = await login(fields.email.value, fields.password.value, fields.remember.value)
    setIsLoading(false)

    if (!ok)
      return

    navigate(getReturnUrl().length > 0 ? decodeURIComponent(getReturnUrl()) : '/')
  }



  return (
    <EmptyLayout className='login-page text-center justify-between'>
      <div className='flex flex-col gap-8'>
        <Logotype />

        <h1 className='text-4xl font-bold'>{ translations.welcomeBack[language] }</h1>
      </div>



      <div className='flex w-full justify-center'>
        <img
          className='w-1/2 ml-8'
          src={ theme === Theme.dark ? welcomeBackDark : welcomeBackLight }
          alt={ translations.pictureWelcomeBack[language] }
        />
      </div>



      <div className='flex flex-col justify-between w-full gap-6'>
        <div className='flex flex-col'>
          <InputGroup>
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

        <div className='flex justify-between items-center'>
          <label className='text-base font-medium flex gap-2'>
            <Checkbox
              name='remember'
              checked={ fields.remember.value }
              onChange={ handleInputChange }
            />

            <span>{ translations.remember[language] }</span>
          </label>

          <Link
            className='link text-base font-medium text-primary'
            to={ getReturnUrl().length > 0
                 ? `/forgotten-password?return=${ encodeURIComponent(getReturnUrl()) }`
                 : '/forgotten-password' }
          >
            { translations.forgottenPassword[language] }
          </Link>
        </div>
      </div>



      <div className='flex flex-col gap-3 mt-auto m-0'>
        <Button
          color='primary'
          onClick={ handleSubmit }
          disabled={ isLoading }
          className='gap-2'
          startIcon={ isLoading ? <LoadingSpinner /> : null }
        >
          { translations.logIn[language] }
        </Button>

        <p className='text-center opacity-80'>{ translations.or[language] }</p>

        <RouterLink to={ getReturnUrl().length > 0
                         ? `/create-account?return=${ encodeURIComponent(getReturnUrl()) }`
                         : '/create-account' }>
          <Button color='primary' variant='outline' className='w-full'>{ translations.createAccount[language] }</Button>
        </RouterLink>
      </div>
    </EmptyLayout>
  )
}
