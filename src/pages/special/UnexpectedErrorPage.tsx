import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Button } from 'react-daisyui'
import { ArrowsClockwise } from 'phosphor-react'

import { EmptyLayout } from '@components/layouts/EmptyLayout'
import useThemeContext, { Theme } from '@contexts/themeContext'
import useTitle from '@hooks/useTitle'

import errorDark from '@assets/error/dark.svg'
import errorLight from '@assets/error/light.svg'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



interface UnexpectedErrorPageProps extends FallbackProps {
}



export default function UnexpectedErrorPage({ error, resetErrorBoundary }: UnexpectedErrorPageProps) {
  // helpers
  const { language } = useLanguageContext()
  const { theme } = useThemeContext()
  useTitle(translations.errorOccured[language])

  return (
    <EmptyLayout className='unexpected-error-page text-center' center>
      <img src={ theme === Theme.dark ? errorDark : errorLight } alt={ translations.pictureApplicationError[language] } className='w-2/3' />

      <h1 className='text-4xl font-bold'>{ translations.errorOccured[language] }</h1>

      <p className='opacity-75'>{ translations.errorOccuredDescription[language] }</p>

      <Button
        color='ghost'
        variant='outline'
        startIcon={ <ArrowsClockwise /> }
        onClick={ resetErrorBoundary }
      >{ translations.tryAgain[language] }</Button>
    </EmptyLayout>
  )
}
