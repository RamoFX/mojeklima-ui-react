import React, { FC } from 'react'
import { Modal, Button } from 'react-daisyui'

import { ConfirmationModalProps } from '@components/modals/ConfirmationModalProps'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



interface ModalConfirmDangerousActionProps extends ConfirmationModalProps {
  loading?: boolean
}



export const ModalConfirmDangerousAction: FC<ModalConfirmDangerousActionProps> = ({ isShown, accept, decline, loading = false }) => {
  // helpers
  const { language } = useLanguageContext()

  return (
    <Modal open={ isShown } onClickBackdrop={ decline }>
      <Modal.Header className='flex flex-col items-center gap-12 font-bold text-center'>
        { translations.areYouSure[language] }
      </Modal.Header>

      <Modal.Body>
        { translations.nonUndoableAction[language] }
      </Modal.Body>

      <Modal.Actions className='justify-center'>
        <Button startIcon={ loading ? <LoadingSpinner /> : null } onClick={ accept } color='error'>{ translations.continue[language] }</Button>

        <Button onClick={ decline } color='primary' variant='outline'>{ translations.cancel[language] }</Button>
      </Modal.Actions>
    </Modal>
  )
}
