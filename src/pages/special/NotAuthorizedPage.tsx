import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-daisyui'

import { EmptyLayout } from '@components/layouts/EmptyLayout'
import useThemeContext, { Theme } from '@contexts/themeContext'

import securityLight from '@assets/unauthorized/light.svg'
import securityDark from '@assets/unauthorized/dark.svg'
import { ArrowLeft } from 'phosphor-react'
import useTitle from '@hooks/useTitle'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function NotAuthorizedPage() {
  const { theme } = useThemeContext()
  const { language } = useLanguageContext()
  useTitle(translations.unauthorized[language])

  return (
    <EmptyLayout className='not-found-page text-center' center>
      <img src={ theme === Theme.dark ? securityDark : securityLight } alt={ translations.pictureAccessDenied[language] } className='w-2/3' />

      <h1 className='text-4xl font-bold'>{ translations.unauthorized[language] }</h1>

      <Link to='/'>
        <Button color='ghost' variant='outline' startIcon={ <ArrowLeft weight='duotone' size={ 24 } /> }>
          { translations.mainPage[language] }
        </Button>
      </Link>
    </EmptyLayout>
  )
}
