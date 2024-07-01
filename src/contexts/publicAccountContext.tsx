import React, { createContext, FC, useContext, ReactNode } from 'react'

import useWebAlertsContext from '@contexts/webAlertsContext'
import useLogger from '@hooks/useLogger'
import useAuthenticationContext from '@contexts/authenticationContext'
import { useRegisterMutation, useLoginMutation, useResetPasswordMutation } from '@graphql/_generated/graphql'



const PublicAccountContext = createContext<ReturnType<typeof usePublicAccount> | null>(null)



interface PublicAccountProviderProps {
  children: ReactNode
}



export const PublicAccountProvider: FC<PublicAccountProviderProps> = ({ children }) => {
  const publicAccount = usePublicAccount()

  return (
    <PublicAccountContext.Provider value={ publicAccount }>
      { children }
    </PublicAccountContext.Provider>
  )
}



export default function usePublicAccountContext() {
  const context = useContext(PublicAccountContext)

  if (context === null) {
    throw new Error('"usePublicAccountContext" should be used within <PublicAccountProvider/>.')
  }

  return context
}



function usePublicAccount() {
  // helpers
  const { addAlert } = useWebAlertsContext()
  const { debug } = useLogger('usePublicAccount')
  const { logout, setIsAuthenticated, setRemember, setToken } = useAuthenticationContext()



  // graphql
  const [ registerMutation ] = useRegisterMutation()
  const [ loginMutation ] = useLoginMutation()
  const [ resetPasswordMutation ] = useResetPasswordMutation()



  // main
  async function register(name: string, email: string) {
    debug('register', 'processing...')
    const variables = { name, email }

    return await registerMutation({ variables })
      .then(_ => {
        debug('register', 'success')
        return true
      })
      .catch((e: Error) => {
        debug('register', 'error: addAlert')
        addAlert('error', e.message)
        return false
      })
  }

  async function login(email: string, password: string, remember: boolean) {
    debug('login', 'processing')
    const variables = { email, password, remember }

    return await loginMutation({ variables })
      .then(async result => {
        debug('login', 'success: setRemember, setToken')
        setRemember(remember)
        setToken(result.data?.login)
        setIsAuthenticated(true)

        return true
      })
      .catch((e: Error) => {
        debug('login', 'error: logout, addAlert')
        logout()
        addAlert('error', e.message)

        return false
      })
  }

  async function resetPassword(email: string) {
    debug('resetPassword', 'reseting forgotten password')
    const variables = { email }

    return await resetPasswordMutation({ variables })
      .then(_ => {
        debug('resetPassword', 'success')
        return true
      })
      .catch((e: Error) => {
        debug('resetPassword', 'error: addAlert')
        addAlert('error', e.message)
        return false
      })
  }



  return {
    register,
    login,
    resetPassword
  }
}
