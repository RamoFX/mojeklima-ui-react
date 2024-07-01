import React, { FC } from 'react'
import { Modal, Button } from 'react-daisyui'

import { ModalProps } from '@components/modals/ModalProps'
import useThemeContext, { Theme } from '@contexts/themeContext'

import emailLight from '@assets/email/light.svg'
import emailDark from '@assets/email/dark.svg'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



interface ModalPasswordResetProps extends ModalProps {
}



export const ModalPasswordReset: FC<ModalPasswordResetProps> = ({ isShown, hide }) => {
  // helpers
  const { language } = useLanguageContext()
  const { theme } = useThemeContext()

  return (
    <Modal open={ isShown } onClickBackdrop={ hide }>
      <Modal.Header className='flex flex-col items-center gap-12 font-bold text-center'>
        <img className='w-1/2' src={ theme === Theme.dark ? emailDark : emailLight } alt={ translations.pictureEmailBox[language] } />

        { translations.passwordChanged[language] }
      </Modal.Header>

      <Modal.Body>
        { translations.generatedPasswordSent[language] }
      </Modal.Body>

      <Modal.Actions className='justify-center'>
        <Button onClick={ hide } color='primary'>{ translations.iUnderstand[language] }</Button>
      </Modal.Actions>
    </Modal>
  )
}
