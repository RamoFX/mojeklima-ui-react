import React, { FC, MouseEvent } from 'react'
import { Pencil } from 'phosphor-react'
import { Button } from 'react-daisyui'

import { FocusIcon } from '@components/layouts/focus-layout/FocusIcon'



interface FocusButtonProps {
  Icon: typeof Pencil,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}



export const FocusButton: FC<FocusButtonProps> = ({ Icon, onClick }) => {
  return (
    <Button color='ghost' shape='circle' onClick={ onClick }>
        <FocusIcon Icon={ Icon } />
    </Button>
  )
}
