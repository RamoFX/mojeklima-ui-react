import React, { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BottomNavigation, Button, Indicator, Stack } from 'react-daisyui'
import { MapTrifold, User, SquaresFour, Bell, Circle } from 'phosphor-react'

import { NavLink } from '@components/navigation/NavLink'
import useWebAlertsContext from '@contexts/webAlertsContext'
import { Logotype } from '@components/brand/Logotype'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import { Avatar } from '@components/domain/account/Avatar'
import { useHasUnseenQuery } from '@graphql/_generated/graphql'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



interface MainLayoutProps {
  children: ReactNode
}



export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  // helpers
  const { language } = useLanguageContext()



  // graphql
  const hasUnseenQuery = useHasUnseenQuery({ fetchPolicy: 'network-only' })



  // contexts
  const { Alerts } = useWebAlertsContext()
  const { me } = usePrivateAccountContext()



  return (
    <div className='main-layout flex flex-col w-full bg-base-200'>

      <div className='flex flex-row justify-between items-center p-8 pb-0 z-0'>
        <Logotype />

        <div className='flex flex-row items-center gap-4'>
          <div className='w-10 h-10 flex justify-center items-center'>
            <Link to='/notifications'>
              <Button shape='circle' color='ghost'>
                <Indicator vertical='top' horizontal='end' item={
                  hasUnseenQuery.data
                  && hasUnseenQuery.data.hasUnseen
                  && (
                    <Stack>
                      <Circle weight='fill' size={ 12 } className='text-primary' />
                      <Circle weight='fill' size={ 12 } className='text-primary animate-ping' />
                    </Stack>
                  )
                }>
                  <Bell weight='bold' size={ 24 } />
                </Indicator>
              </Button>
            </Link>
          </div>

          <Link to='/account'>
            <Avatar avatarUrl={ me?.avatarUrl } name={ me?.name } small />
          </Link>
        </div>
      </div>



      <div className='flex flex-col p-8 pb-28 gap-8 bg-base-200'>
        { children }
      </div>



      <BottomNavigation className='bg-base-100 h-20'>
        <NavLink path='/overview' Icon={ SquaresFour }>{ translations.overview[language] }</NavLink>
        <NavLink path='/locations' Icon={ MapTrifold }>{ translations.locations[language] }</NavLink>
        <NavLink path='/account' Icon={ User }>{ translations.myAccount[language] }</NavLink>
      </BottomNavigation>


      
      { Alerts }

    </div>
  )
}
