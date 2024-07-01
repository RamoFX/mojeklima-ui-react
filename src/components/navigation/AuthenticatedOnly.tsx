import React, { FC, useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import useAuthenticationContext from '@contexts/authenticationContext'
import { PrivateAccountProvider } from '@contexts/privateAccountContext'
import useLoadingContext from '@contexts/loadingContext'



export const AuthenticatedOnly: FC = () => {
  const { pathname, search } = useLocation()
  const { isAuthenticated, checkTokenValidity } = useAuthenticationContext()
  const { addTask } = useLoadingContext()



  // check token validity on every path change
  async function performCheck() {
    const removeTask = addTask('perform authentication check')
    await checkTokenValidity()
    removeTask()
  }

  useEffect(() => {
    performCheck()
  }, [ pathname ])



  if (isAuthenticated === null)
    return <></>

  if (!isAuthenticated)
    return <Navigate to={ `/login?return=${ encodeURIComponent(`${ pathname }${ search }`) }` } />

  else
    return (
      <PrivateAccountProvider>
        <Outlet />
      </PrivateAccountProvider>
    )
}
