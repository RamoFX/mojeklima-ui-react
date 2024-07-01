import React, { FC } from 'react'
import { FocusLink } from '@components/layouts/focus-layout/FocusLink'
import { ArrowLeft } from 'phosphor-react'



interface FocusBackLinkProps {
  to: string
}



export const FocusBackLink: FC<FocusBackLinkProps> = ({ to }) => {
  return <FocusLink to={ to } Icon={ ArrowLeft } />
}
