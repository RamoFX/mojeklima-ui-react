import React, { createContext, FC, useContext, ReactNode } from 'react'

import useLoading from '@hooks/useLoading'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'



const LoadingContext = createContext<ReturnType<typeof useLoading> | null>(null)



interface LoadingProviderProps {
  children: ReactNode
}



export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const { loading, addTask } = useLoading()

  return (
    <LoadingContext.Provider value={ { loading, addTask } }>
      { children }

      <div className={ loading ? 'screen-shown' : 'screen-hidden' }>
        <LoadingSpinner size={ 48 } />
      </div>
    </LoadingContext.Provider>
  )
}



export default function useLoadingContext() {
  const context = useContext(LoadingContext)

  if (context === null) {
    throw new Error('"useLoadingContext" should be used within <LoadingProvider/>.')
  }

  return context
}
