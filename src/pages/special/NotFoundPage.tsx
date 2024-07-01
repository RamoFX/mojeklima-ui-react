import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-daisyui'

import { EmptyLayout } from '@components/layouts/EmptyLayout'
import useThemeContext, { Theme } from '@contexts/themeContext'

import searchingLight from '@assets/not-found/light.svg'
import searchingDark from '@assets/not-found/dark.svg'
import { ArrowLeft } from 'phosphor-react'
import useTitle from '@hooks/useTitle'
import translations from '@root/languages/translations'
import useLanguageContext from '@contexts/languageContext'



export default function NotFoundPage() {
  // helpers
  const { language } = useLanguageContext()
  const { theme } = useThemeContext()
  useTitle(translations.pageWasNotFound[language])

  return (
    <EmptyLayout className='not-found-page text-center' center>
      <img src={ theme === Theme.dark ? searchingDark : searchingLight } alt={ translations.pictureNotFound[language] } className='w-2/3' />

      <h1 className='text-4xl font-bold'>{ translations.pageWasNotFound[language] }</h1>

      <Link to='/'>
        <Button color='ghost' variant='outline' startIcon={ <ArrowLeft weight='duotone' size={ 24 } /> }>
          { translations.mainPage[language] }
        </Button>
      </Link>
    </EmptyLayout>
  )
}
