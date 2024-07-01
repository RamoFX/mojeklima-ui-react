import React, { FC } from 'react'
import { Umbrella } from 'phosphor-react'



interface FocusIconProps {
  Icon: typeof Umbrella
}



export const FocusIcon: FC<FocusIconProps> = ({ Icon }) => {
  return <Icon weight='bold' size={ 24 } />
}
