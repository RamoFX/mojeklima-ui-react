import React, { FC } from 'react'
import { Spinner } from 'phosphor-react'



interface LoadingSpinnerProps {
  size?: number
}



// TODO: Implement LoadingSpinner
export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = 24 }) => {
  return (
    <Spinner weight='bold' size={ size }>
      <animateTransform
        attributeName='transform'
        attributeType='XML'
        type='rotate'
        dur='2s'
        from='0 0 0'
        to='360 0 0'
        repeatCount='indefinite'
      />
    </Spinner>
  )
}
