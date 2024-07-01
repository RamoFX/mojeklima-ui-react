import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'react-daisyui'
import { User, Envelope, Key } from 'phosphor-react'

import { FocusLayout } from '@components/layouts/FocusLayout'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import { TextSkeleton } from '@components/skeleton/TextSkeleton'
import useTitle from '@hooks/useTitle'
import { FocusBackLink } from '@components/layouts/focus-layout/FocusBackLink'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function EditAccountPage() {
  // helpers
  const { language } = useLanguageContext()
  const { me } = usePrivateAccountContext()
  useTitle(translations.editData[language])



  return (
    <FocusLayout className='edit-account-page' title={ translations.editData[language] } elementStart={ <FocusBackLink to='/account' /> }>
      <Menu className='rounded-box p-2 gap-2'>
        <Menu.Item>
          <Link to='/account/edit/name' className='items-start'>
            <User weight='duotone' size={ 24 } />
            <div className='flex flex-col grow'>
              <span className='font-medium'>{ translations.name[language] }</span>

              {
                me === undefined
                ? <TextSkeleton className='text-sm w-1/2' />
                : <span className='text-sm opacity-75'>{ me.name }</span>
              }
            </div>
          </Link>
        </Menu.Item>

        { /*
          <Menu.Item>
            <Link to='/account/edit/avatar'>
              <UserFocus weight='duotone' size={ 24 }/>
              <span className='font-medium'>Profilový obrázek</span>
            </Link>
          </Menu.Item>
        */ }

        <Menu.Item>
          <Link to='/account/edit/email' className='items-start'>
            <Envelope weight='duotone' size={ 24 } />
            <div className='flex flex-col grow'>
              <span className='font-medium'>{ translations.email[language] }</span>

              {
                me === undefined
                ? <TextSkeleton className='text-sm w-4/5' />
                : <span className='text-sm opacity-75'>{ me.email }</span>
              }
            </div>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to='/account/edit/password' className='items-start'>
            <Key weight='duotone' size={ 24 } />
            <div className='flex flex-col'>
              <span className='font-medium'>{ translations.password[language] }</span>
              <span className='text-sm opacity-75'>********</span>
            </div>
          </Link>
        </Menu.Item>
      </Menu>



      {
        me === undefined
        ? <TextSkeleton className='text-sm w-1/2 mx-auto' />
        : <span className='text-sm font-medium opacity-75 text-center'>{ translations.lastEdit[language] } { new Date(me.updatedAt).toLocaleDateString(
          'cs') }</span>
      }
    </FocusLayout>
  )
}
