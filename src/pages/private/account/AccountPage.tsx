import React, { useState, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'react-daisyui'
import { Pencil, Trash, SignOut, Swatches, Monitor, Translate } from 'phosphor-react'
import { FocusLayout } from '@components/layouts/FocusLayout'
import useThemeContext, { Theme } from '@contexts/themeContext'
import { ModalConfirmDangerousAction } from '@components/modals/ModalConfirmDangerousAction'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import { Avatar } from '@components/domain/account/Avatar'
import { TextSkeleton } from '@components/skeleton/TextSkeleton'
import useTitle from '@hooks/useTitle'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export default function AccountPage() {
  // helpers
  const { language } = useLanguageContext()
  const { me, deleteAccount } = usePrivateAccountContext()
  const { theme, selectTheme, deselectTheme } = useThemeContext()
  const [ isModalShown, setIsModalShown ] = useState(false)
  const [ deleteInProgress, setDeleteInProgress ] = useState(false)
  const navigate = useNavigate()
  useTitle(translations.myAccount[language])



  // theme
  function handleThemeChange() {
    selectTheme(theme === Theme.dark ? Theme.light : Theme.dark)
  }

  function handleThemeReset() {
    deselectTheme()
  }



  // language selector
  const { openModal: openLanguageModal } = useLanguageContext()



  // account deletion
  function handleAccountDeletionAttempt(args: MouseEvent<HTMLButtonElement>) {
    setIsModalShown(true)
  }

  async function acceptAccountDeletion() {
    setDeleteInProgress(true)

    await deleteAccount()

    navigate('/logout')
  }

  function delcineAccountDeletion() {
    setIsModalShown(false)
  }



  // demonstrate error boundary
  // useEffect(() => {
  //   const error = new Error()
  //   error.name = 'DevelopmentError'
  //   error.message = 'Error thrown for development purposes'
  //
  //   if (Boolean(Math.round(Math.random())))
  //     throw error
  // }, [])



  return (
    <FocusLayout title={ translations.myAccount[language] }>
      <div className='flex flex-row gap-8 items-center'>
        <Avatar avatarUrl={ me?.avatarUrl } name={ me?.name } />

        <div className='flex flex-col gap-2 items-start grow'>
          {
            me === undefined
            ? <TextSkeleton className='text-xl bg-neutral w-4/5' />
            : <span className='text-xl font-bold'>{ me.name }</span>
          }

          {
            me === undefined
            ? <TextSkeleton className='text-sm w-full bg-neutral' />
            : <span className='text-sm font-medium opacity-75'>{ me.email }</span>
          }
        </div>
      </div>



      <Menu className='rounded-box p-2 gap-2'>
        <Menu.Title className='uppercase'>{ translations.settings[language] }</Menu.Title>
        <Menu.Item>
          <button color='ghost' onClick={ handleThemeChange }>
            <Swatches />
            <span className='font-medium'>{ theme === Theme.dark
                                            ? translations.switchToLightTheme[language]
                                            : translations.switchToDarkTheme[language] }</span>
          </button>
        </Menu.Item>
        <Menu.Item>
          <button color='ghost' onClick={ handleThemeReset }>
            <Monitor />
            <span className='font-medium'>{ translations.applySystemTheme[language] }</span>
          </button>
        </Menu.Item>
        <Menu.Item>
          <button color='ghost' onClick={ openLanguageModal }>
            <Translate />
            <span className='font-medium'>{ translations.language[language] }</span>
          </button>
        </Menu.Item>

        <Menu.Title className='uppercase'>{ translations.accountManagement[language] }</Menu.Title>
        <Menu.Item>
          <Link to='/account/edit'>
            <Pencil />
            <span className='font-medium'>{ translations.editData[language] }</span>
          </Link>
        </Menu.Item>
        <Menu.Item className='text-error'>
          <button className='active:bg-error active:text-error-content' onClick={ handleAccountDeletionAttempt }>
            <Trash />
            <span className='font-medium'>{ translations.deleteAccount[language] }</span>
          </button>
        </Menu.Item>

        <Menu.Title className='uppercase'>{ translations.actions[language] }</Menu.Title>
        <Menu.Item>
          <Link to='/logout'>
            <SignOut />
            <span className='font-medium'>{ translations.logOut[language] }</span>
          </Link>
        </Menu.Item>
      </Menu>



      {
        me === undefined
        ? <TextSkeleton className='text-sm bg-neutral w-1/2 mx-auto' />
        :
        <span className='text-sm font-medium opacity-75 text-center'>{ translations.userSince[language] } { new Date(me.createdAt).toLocaleDateString('cs') }</span>
      }



      <ModalConfirmDangerousAction isShown={ isModalShown }
                                   accept={ acceptAccountDeletion }
                                   decline={ delcineAccountDeletion }
                                   loading={ deleteInProgress } />
    </FocusLayout>
  )
}
