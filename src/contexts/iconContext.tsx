import { IconContext } from 'phosphor-react'
import { FC, ReactNode } from 'react'



interface IconProviderProps {
  children: ReactNode
}



export const IconProvider: FC<IconProviderProps> = ({ children }) => {
  const { Provider: IconProvider } = IconContext

  const iconProps = {
    color: 'currentColor',
    size: 24,
    weight: 'duotone',
    mirrored: false
  } as const

  return <IconProvider value={ iconProps }>{ children }</IconProvider>
}
