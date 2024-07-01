import React, { FC, ReactNode } from 'react'



interface NoticeProps {
  children: ReactNode
}



export const Notice: FC<NoticeProps> = ({ children }) => {
  return (
    <div className='flex flex-col justify-center items-center p-8'>
      <span className='opacity-75 text-sm'>{ children }</span>
    </div>
  )
}
