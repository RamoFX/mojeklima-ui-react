import React, { FC, lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes as ReactRoutes, Navigate } from 'react-router-dom'

import { AuthenticatedOnly } from '@components/navigation/AuthenticatedOnly'
import { AuthorizedOnly } from '@components/navigation/AuthorizedOnly'
import pkg from '../../../package.json'
import { AccountRoleEnum } from '@graphql/_generated/graphql'
import { LoadingLayout } from '@components/layouts/LoadingLayout'
import NotificationsPage from '@pages/private/NotificationsPage'
import LocationPage from '@pages/private/LocationPage'
import { OnRouteChange } from '@components/navigation/OnRouteChange'



const CreateAccountPage = lazy(() => import('@pages/public/CreateAccountPage'))
const LoginPage = lazy(() => import('@pages/public/LoginPage'))
const ForgottenPasswordPage = lazy(() => import('@pages/public/ForgottenPasswordPage'))
const LogoutPage = lazy(() => import('@pages/private/LogoutPage'))
const OverviewPage = lazy(() => import('@pages/private/OverviewPage'))
const NotFoundPage = lazy(() => import('@pages/special/NotFoundPage'))
const NotAuthorizedPage = lazy(() => import('@pages/special/NotAuthorizedPage'))
const LocationsPage = lazy(() => import('@pages/private/LocationsPage'))
const AccountPage = lazy(() => import('@pages/private/account/AccountPage'))
const EditAccountPage = lazy(() => import('@pages/private/account/EditAccountPage'))
const EditAccountNamePage = lazy(() => import('@pages/private/account/edit/EditAccountNamePage'))
const EditAccountAvatarPage = lazy(() => import('@pages/private/account/edit/EditAccountAvatarPage'))
const EditAccountEmailPage = lazy(() => import('@pages/private/account/edit/EditAccountEmailPage'))
const EditAccountPasswordPage = lazy(() => import('@pages/private/account/edit/EditAccountPasswordPage'))
const AdminPage = lazy(() => import('@pages/admin/AdminPage'))



export const Routes: FC = () => {
  const PublicZone = (
    <>
      <Route path='/create-account' element={ <CreateAccountPage /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/forgotten-password' element={ <ForgottenPasswordPage /> } />
      <Route path='/logout' element={ <LogoutPage /> } />
    </>
  )



  const UserZone = (
    <>
      <Route path='/' element={ <Navigate to='/overview' /> } />
      <Route path='/overview' element={ <OverviewPage /> } />
      <Route path='/notifications' element={ <NotificationsPage /> } />
      <Route path='/locations' element={ <LocationsPage /> } />
      <Route path='/locations/:id' element={ <LocationPage /> } />
      <Route path='/account' element={ <AccountPage /> } />
      <Route path='/account/edit' element={ <EditAccountPage /> } />
      <Route path='/account/edit/name' element={ <EditAccountNamePage /> } />
      <Route path='/account/edit/avatar' element={ <EditAccountAvatarPage /> } />
      <Route path='/account/edit/email' element={ <EditAccountEmailPage /> } />
      <Route path='/account/edit/password' element={ <EditAccountPasswordPage /> } />
    </>
  )



  const AdminZone = (
    <>
      <Route element={ <AuthorizedOnly roles={ [ AccountRoleEnum.Admin ] } /> }>
        <Route path='/admin' element={ <AdminPage /> } />
      </Route>
    </>
  )



  const SpecialZone = (
    <>
      <Route path='/unauthorized' element={ <NotAuthorizedPage /> } />
      <Route path='*' element={ <NotFoundPage /> } />
     </>
  )



  const PrivateZone = (
    <>
      <Route element={ <AuthenticatedOnly /> }>
        { UserZone }

        { AdminZone }

        { SpecialZone }
      </Route>
    </>
  )



  return (
    <Router basename={ pkg.homepage }>
      <Suspense fallback={ <LoadingLayout /> }>
        <ReactRoutes>
          <Route element={ <OnRouteChange /> }>
            { PublicZone }

            { PrivateZone }
          </Route>
        </ReactRoutes>
      </Suspense>
    </Router>
  )
}
