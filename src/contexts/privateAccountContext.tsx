import React, { createContext, FC, useContext, ReactNode } from 'react'

import { PushNotificationsProvider } from '@contexts/pushNotificationsContext'
import useWebAlertsContext from '@contexts/webAlertsContext'
import useLogger from '@hooks/useLogger'
import useAuthenticationContext from '@contexts/authenticationContext'
import { useUpdateNameMutation, useUpdateAvatarMutation, useUpdateEmailMutation, useUpdatePasswordMutation, useDeleteAccountMutation, useMeQuery } from '@graphql/_generated/graphql'
import { LocationsProvider } from '@contexts/locationsContext'



const PrivateAccountContext = createContext<ReturnType<typeof usePrivateAccount> | null>(null)



interface PrivateAccountProviderProps {
  children: ReactNode
}



export const PrivateAccountProvider: FC<PrivateAccountProviderProps> = ({ children }) => {
  const privateAccount = usePrivateAccount()

  return (
    <PrivateAccountContext.Provider value={ privateAccount }>
      <PushNotificationsProvider>
        <LocationsProvider>
          { children }
        </LocationsProvider>
      </PushNotificationsProvider>
    </PrivateAccountContext.Provider>
  )
}



export default function usePrivateAccountContext() {
  const context = useContext(PrivateAccountContext)

  if (context === null) {
    throw new Error('"usePrivateAccountContext" should be used within <PrivateAccountProvider/>.')
  }

  return context
}



function usePrivateAccount() {
  // helpers
  const { addAlert } = useWebAlertsContext()
  const { debug } = useLogger('usePrivateAccount')
  const { logout } = useAuthenticationContext()



  // graphql
  const [ updateNameMutation ] = useUpdateNameMutation({})
  const [ updateAvatarMutation ] = useUpdateAvatarMutation({})
  const [ updateEmailMutation ] = useUpdateEmailMutation({})
  const [ updatePasswordMutation ] = useUpdatePasswordMutation({})
  const [ deleteAccountMutation ] = useDeleteAccountMutation({})

  const meQuery = useMeQuery({ fetchPolicy: 'network-only' })



  // main
  async function updateName(name: string) {
    debug('updateName', 'processing')
    const variables = { name }

    await updateNameMutation({ variables })
      .then(result => {
        debug('updateName', 'success: meQuery.updateQuery')
        meQuery.updateQuery(() => {
          if (!result.data)
            throw new Error()

          return {
            me: result.data.updateName
          }
        })
      })
      .catch((e: Error) => {
        debug('updateName', 'error: throw')
        throw e
      })
  }

  async function updateAvatar() {
    debug('updateAvatar', 'processing')

    await updateAvatarMutation()
      .then(result => {
        debug('updateAvatar', 'success: meQuery.updateQuery')
        meQuery.updateQuery(() => {
          if (!result.data)
            throw new Error()

          return {
            me: result.data.updateAvatar
          }
        })
      })
      .catch((e: Error) => {
        debug('updateAvatar', 'error: throw')
        throw e
      })
  }

  async function updateEmail(email: string) {
    debug('updateEmail', 'processing')
    const variables = { email }

    return await updateEmailMutation({ variables })
      .then(result => {
        debug('updateEmail', 'success: meQuery.updateQuery')
        meQuery.updateQuery(() => {
          if (!result.data)
            throw new Error()

          return {
            me: result.data.updateEmail
          }
        })

        return true
      })
      .catch((e: Error) => {
        debug('updateEmail', 'error: alert, return false')
        addAlert('error', e.message)
        return false
      })
  }

  async function updatePassword(password: string) {
    debug('updatePassword', 'processing')
    const variables = { password }

    await updatePasswordMutation({ variables })
      .then(_ => {
        debug('updatePassword', 'success')
      })
      .catch((e: Error) => {
        debug('updatePassword', 'error: throw')
        throw e
      })
  }

  async function deleteAccount() {
    debug('deleteAccount', 'processing')

    return await deleteAccountMutation()
      .then(_ => {
        debug('deleteAccount', 'success: logout')
        logout()
        return true
      })
      .catch((e: Error) => {
        debug('deleteAccount', 'error: addAlert')
        addAlert('error', e.message)
        return false
      })
  }



  return {
    me: meQuery.data?.me,
    meLoading: meQuery.loading,
    meError: meQuery.error,
    updateName,
    updateAvatar,
    updateEmail,
    updatePassword,
    deleteAccount
  }
}
