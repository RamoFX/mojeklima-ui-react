import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthenticationContext from '@contexts/authenticationContext'
import useTitle from '@hooks/useTitle'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function LogoutPage() {
  // helpers
  const { logout } = useAuthenticationContext()
  const { language } = useLanguageContext()
  useTitle(translations.logOut[language])



  // effects
  useEffect(() => {
    logout()
  }, [])



  return <Navigate to='/login' />
}
