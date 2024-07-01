import React, { FC } from 'react'
import { Avatar as UiAvatar } from 'react-daisyui'

import { Account } from '@graphql/_generated/graphql'
import { initialsFromName, classes } from '@utilities/common'



interface AvatarProps {
  avatarUrl: Account['avatarUrl'] | undefined,
  name: Account['name'] | undefined,
  small?: boolean,
  className?: string
}



export const Avatar: FC<AvatarProps> = ({ avatarUrl, name, small = false, className = null }) => {
  const classNames = classes(className)

  return (
    <UiAvatar
      className={ classNames }
      src={ avatarUrl ?? undefined }
      shape='circle'
      size={ small ? 'xs' : 'md' }
      letters={ name === undefined ? ' ' : initialsFromName(name, small ? 1 : 4) }
    />
  )
}
