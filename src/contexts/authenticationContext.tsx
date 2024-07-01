import React, { createContext, FC, useContext, ReactNode, useState, useEffect } from 'react'
import { useBeforeUnload } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

import useWebAlertsContext from '@contexts/webAlertsContext'
import useLogger from '@hooks/useLogger'
import { useRenewTokenMutation } from '@graphql/_generated/graphql'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'
import { client } from '@graphql/client'



const AuthenticationContext = createContext<ReturnType<typeof useAuthentication> | null>(null)



interface AuthenticationProviderProps {
  children: ReactNode
}



export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({ children }) => {
  const authentication = useAuthentication()

  return (
    <AuthenticationContext.Provider value={ authentication }>
      { children }
    </AuthenticationContext.Provider>
  )
}



export default function useAuthenticationContext() {
  const context = useContext(AuthenticationContext)

  if (context === null) {
    throw new Error('"useAuthenticationContext" should be used within <AuthenticationProvider/>.')
  }

  return context
}



function useAuthentication() {
  // helpers
  const { language } = useLanguageContext()
  const { addAlert } = useWebAlertsContext()
  const { debug } = useLogger('useAuthentication')
  useBeforeUnload(beforeUnload)
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean | null>(null)



  // local storage
  const [ token, setToken, removeToken ] = useLocalStorage<string>('token')
  const [ remember, setRemember, removeRemember ] = useLocalStorage<boolean>('remember')



  // graphql
  const [ renewTokenMutation ] = useRenewTokenMutation()



  // helpers
  function isTokenSet() {
    return typeof token === 'string' && token.length > 0
  }

  async function checkTokenValidity() {
    debug('checkTokenValidity', 'processing')
    await renew()
  }

  function beforeUnload(_: BeforeUnloadEvent) {
    if (!remember)
      logout()
  }



  // main logic
  async function renew() {
    if (!isTokenSet()) {
      debug('renew', 'aborted - token is missing: setIsAuthenticated')
      return setIsAuthenticated(false)
    }

    if (remember && isAuthenticated !== null) {
      return debug('renew', 'aborted - remember is true')
    }

    debug('renew', 'processing')
    const variables = { remember: remember ?? false }

    await renewTokenMutation({ variables })
      .then(result => {
        debug('renew', 'success: setToken, setIsAuthenticated')
        setToken(result.data!.renewToken)
        setIsAuthenticated(true)
      })
      .catch(_ => {
        debug('renew', 'error: setIsAuthenticated, addAlert')
        setIsAuthenticated(false)
        addAlert('error', translations.sessionExpired[language])
      })
  }

  function logout() {
    debug('logout', 'clearStore (apollo cache), removeToken, removeRemember')
    client.clearStore()
    removeToken()
    removeRemember()
  }



  // effects
  useEffect(() => {
    if (isTokenSet()) {
      renew()
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated === false)
      logout()
  }, [ isAuthenticated ])



  return {
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken,
    remember,
    setRemember,
    checkTokenValidity,
    logout
  }
}
