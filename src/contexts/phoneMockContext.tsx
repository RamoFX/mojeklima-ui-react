import React, { createContext, FC, useContext, ReactNode } from 'react'
import { isDesktop } from 'react-device-detect'
import { PhoneMockup } from 'react-daisyui'



const PhoneMockContext = createContext<{} | null>(null)



interface PhoneMockProviderProps {
  children: ReactNode
}



export const PhoneMockProvider: FC<PhoneMockProviderProps> = ({ children }) => {
  return (
    <PhoneMockContext.Provider value={ {} }>
      { isDesktop
        ? (
          <PhoneMockup>
            { children }
          </PhoneMockup>
        )
        : children
      }
    </PhoneMockContext.Provider>
  )
}



export default function usePhoneMockContext() {
  const context = useContext(PhoneMockContext)

  if (context === null) {
    throw new Error('"usePhoneMockContext" should be used within <PhoneMockProvider/>.')
  }

  return context
}
