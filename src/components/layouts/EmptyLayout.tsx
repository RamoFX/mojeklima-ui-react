import React, { FC, ReactNode } from 'react'
import useWebAlertsContext from '@contexts/webAlertsContext'
import { classes } from '@utilities/common'



interface EmptyLayoutProps {
  className?: string,
  center?: boolean,
  children: ReactNode
}



export const EmptyLayout: FC<EmptyLayoutProps> = ({ className = null, center, children }) => {
  const { Alerts } = useWebAlertsContext()

  const classNames = classes(
    'empty-layout w-full h-full p-8 flex flex-col gap-12 overflow-x-auto',
    className,
    center ? 'items-center justify-center' : null
  )

  return (
    <div className={ classNames }>
      { children }

      { Alerts }
    </div>
  )
}
