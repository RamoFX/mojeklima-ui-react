import React, { FC, ReactNode } from 'react'
import { BottomNavigation } from 'react-daisyui'
import { MapTrifold, User, SquaresFour } from 'phosphor-react'
import { NavLink } from '@components/navigation/NavLink'
import useWebAlertsContext from '@contexts/webAlertsContext'
import { classes } from '@utilities/common'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



interface FocusLayoutProps {
  elementStart?: ReactNode,
  elementEnd?: ReactNode,
  title: string,
  className?: string,
  contentClassName?: string,
  fullSize?: boolean,
  children: ReactNode
}



export const FocusLayout: FC<FocusLayoutProps> = ({
  elementStart,
  elementEnd,
  title,
  className = null,
  contentClassName = null,
  fullSize = false,
  children
}) => {
  // helpers
  const { language } = useLanguageContext()
  const { Alerts } = useWebAlertsContext()

  const classNames = classes(
    'focus-layout flex flex-col w-full h-full bg-base-200 overflow-x-hidden',
    className
  )

  const contentClassNames = classes(
    'flex flex-col gap-8 bg-base-200',
    fullSize ? 'pt-16 pb-20' : 'p-8 pt-24 pb-28',
    contentClassName
  )



  return (
    <>
      {/*<Alerts className='z-20 pt-20'/>*/ }

      <div className='[&>*]:pt-20'>
        { Alerts }
      </div>

      <div className={ classNames }>
        <div className='fixed w-full h-16 z-10 flex flex-row justify-between items-center bg-base-100 px-8 drop-shadow-md'>
          <div className='flex justify-center items-center w-6 h-6'>
            { elementStart ?? <></> }
          </div>

          <h1 className='text-lg font-black'>{ title }</h1>

          <div className='flex justify-center items-center w-6 h-6'>
            { elementEnd ?? <></> }
          </div>
        </div>

        <div className={ contentClassNames }>
          { children }
        </div>

      </div>

      <BottomNavigation className='bg-base-100 h-20 drop-shadow-2xl'>
        <NavLink path='/overview' Icon={ SquaresFour }>{ translations.overview[language] }</NavLink>
        <NavLink path='/locations' Icon={ MapTrifold }>{ translations.locations[language] }</NavLink>
        <NavLink path='/account' Icon={ User }>{ translations.myAccount[language] }</NavLink>
      </BottomNavigation>
    </>
  )
}
