import React, { FC } from 'react'
import { classes } from '@utilities/common'



interface LogotypeProps {
  center?: boolean
}



export const Logotype: FC<LogotypeProps> = ({ center = false }) => {
  const classNames = classes(
    'font-logotype text-accent text-2xl',
    center ? 'text-center' : null
  )

  return (
    <span className={ classNames }>
      <span>Moje</span>
      <span>Klima</span>
    </span>
  )
}
