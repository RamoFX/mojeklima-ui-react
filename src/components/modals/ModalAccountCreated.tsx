import React, { FC } from 'react'
import { Modal, Button } from 'react-daisyui'

import { ModalProps } from '@components/modals/ModalProps'
import useThemeContext, { Theme } from '@contexts/themeContext'
import useLanguageContext from '@contexts/languageContext'

import emailLight from '@assets/email/light.svg'
import emailDark from '@assets/email/dark.svg'
import translations from '@root/languages/translations'



interface ModalAccountCreatedProps extends ModalProps {
}



export const ModalAccountCreated: FC<ModalAccountCreatedProps> = ({ isShown, hide }) => {
  // helpers
  const { language } = useLanguageContext()
  const { theme } = useThemeContext()

  return (
    <Modal open={ isShown } onClickBackdrop={ hide }>
      <Modal.Header className='flex flex-col items-center gap-12 font-bold text-center'>
        <img className='w-1/2' src={ theme === Theme.dark ? emailDark : emailLight } alt={ translations.pictureEmailBox[language] } />

        { translations.accountCreated[language] }
      </Modal.Header>

      <Modal.Body>
        { translations.passwordSent[language] }
      </Modal.Body>

      <Modal.Actions className='justify-center'>
        <Button onClick={ hide } color='primary'>{ translations.iUnderstand[language] }</Button>
      </Modal.Actions>
    </Modal>
  )
}
