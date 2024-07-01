import React, { FC, useState, useEffect, ReactNode } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { House } from 'phosphor-react'



interface NavLinkProps {
  path: string,
  Icon: typeof House
  children: ReactNode
}



export const NavLink: FC<NavLinkProps> = ({ path, Icon, children }) => {
  const { pathname } = useLocation()
  const [ isActive, setIsActive ] = useState(false)

  useEffect(() => {
    setIsActive(pathname.startsWith(path))
  }, [ pathname, path ])

  return (
    <Link to={ path } className={ isActive ? 'opacity-100 text-primary' : 'opacity-75' }>
      <Icon weight='bold' size={ 24 }/>

      <span className='font-bold text-sm'>{ children }</span>
    </Link>
  )
}