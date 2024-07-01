import React, { FC } from 'react'

import { Notice } from '@components/data-state/Notice'
import translations from '@root/languages/translations'
import useLanguageContext from '@contexts/languageContext'



export const DataUnavailable: FC = () => {
  // helpers
  const { language } = useLanguageContext()



  return <Notice>{ translations.dataUnavailable[language] }</Notice>
}
