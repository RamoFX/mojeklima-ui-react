import React, { FC } from 'react'
import { Modal, Button } from 'react-daisyui'

import { ModalProps } from '@components/modals/ModalProps'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



interface ModalSuccessfulChangesProps extends ModalProps {
}



export const ModalSuccessfulChanges: FC<ModalSuccessfulChangesProps> = ({ isShown, hide }) => {
  // helpers
  const { language } = useLanguageContext()

  return (
    <Modal open={ isShown } onClickBackdrop={ hide }>
      <Modal.Header className='font-bold text-center'>
        { translations.successfulChanges[language] }
      </Modal.Header>

      <Modal.Actions className='justify-center'>
        <Button onClick={ hide } color='primary'>{ translations.continue[language] }</Button>
      </Modal.Actions>
    </Modal>
  )
}
