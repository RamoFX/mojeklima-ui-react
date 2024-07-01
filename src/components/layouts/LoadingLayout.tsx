import React, { FC } from 'react'

import { LoadingSpinner } from '@components/data-state/LoadingSpinner'



export const LoadingLayout: FC = () => {
  return (
    <div className='loading-layout w-full h-full flex justify-center items-center'>
      <LoadingSpinner size={ 48 } />
    </div>
  )
}
