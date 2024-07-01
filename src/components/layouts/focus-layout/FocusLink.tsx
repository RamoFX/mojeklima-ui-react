import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-daisyui'
import { ArrowLeft } from 'phosphor-react'
import { FocusIcon } from '@components/layouts/focus-layout/FocusIcon'



interface FocusLinkProps {
  to: string,
  Icon: typeof ArrowLeft
}



export const FocusLink: FC<FocusLinkProps> = ({ to, Icon }) => {
  return (
    <Link to={ to }>
      <Button shape='circle' color='ghost'>
        <FocusIcon Icon={ Icon } />
      </Button>
    </Link>
  )
}
