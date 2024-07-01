import React, { FC } from 'react'
import { classes } from '@utilities/common'



interface TextSkeletonProps {
  className?: string
}



export const TextSkeleton: FC<TextSkeletonProps> = ({ className = null }) => {
  const classNames = classes(
    'text-skeleton bg-[#555] opacity-[.15] rounded-lg scale-y-75',
    className
  )

  return (
    <span className={ classNames }>
      <span className='opacity-0'>a</span>
    </span>
  )
}
