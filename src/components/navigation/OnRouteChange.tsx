import React, { FC, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useWebAlertsContext from '@contexts/webAlertsContext'



export const OnRouteChange: FC = () => {
  const location = useLocation()
  const { removeAll } = useWebAlertsContext()

  useEffect(() => {
    removeAll(location.pathname)
  }, [ location ])

  return <Outlet />
}
