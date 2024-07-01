import React, { FC, useState, useEffect } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
// import { role } from '@models/role'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import { AccountRoleEnum } from '@graphql/_generated/graphql'
import { LoadingLayout } from '@components/layouts/LoadingLayout'



interface AuthorizedOnlyProps {
  roles: Array<AccountRoleEnum>
}



export const AuthorizedOnly: FC<AuthorizedOnlyProps> = ({ roles }) => {
  const { pathname } = useLocation()
  const { me } = usePrivateAccountContext()
  const [ isAuthorized, setIsAuthorized ] = useState<boolean | null>(null)



  // check on: path change, me change (can be undefined or changed)
  useEffect(() => {
    if (me === undefined)
      return

    setIsAuthorized(roles.includes(me.role as AccountRoleEnum))
  }, [ pathname, me ])



  if (isAuthorized === null)
    return <LoadingLayout />

  if (!isAuthorized)
    return <Navigate to='/unauthorized' />

  else
    return <Outlet />
}
