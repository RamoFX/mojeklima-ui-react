import React, { useState, ChangeEvent } from 'react'
import { FocusLayout } from '@components/layouts/FocusLayout'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from 'react-daisyui'

import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { ModalSuccessfulChanges } from '@components/modals/ModalSuccessfulChanges'
import useWebAlertsContext from '@contexts/webAlertsContext'
import usePrivateAccountContext from '@contexts/privateAccountContext'
import { Avatar } from '@components/domain/account/Avatar'
import useTitle from '@hooks/useTitle'
import { FocusBackLink } from '@components/layouts/focus-layout/FocusBackLink'



export default function EditAccountAvatarPage() {
  const { addAlert } = useWebAlertsContext()
  const { me, updateAvatar } = usePrivateAccountContext()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isModalShown, setIsModalShown ] = useState(false)
  const [ avatar, setAvatar ] = useState<File | null>(null)
  useTitle('Úprava profilového obrázku')
  const navigate = useNavigate()



  // main logic
  function handleChange(args: ChangeEvent<HTMLInputElement>) {
    // check files length
    if (args.target.files === null || args.target.files.length === 0)
      return addAlert('warning', 'Musíte vybrat obrázek')

    const file = args.target.files[0]

    // check file size
    if (file.size > 5_000_000)
      return addAlert('warning', 'Velikost obrázku na úložišti nesmí přesahovat 5 MB')

    setAvatar(file)
  }

  function handleSubmit() {
    setIsLoading(true)
    // await updateAvatar() // TODO
    setIsLoading(false)

    setIsModalShown(true)
  }

  function handleModalClose() {
    setIsModalShown(false)
    navigate('/account/edit')
  }



  return (
    <FocusLayout className='edit-account-name-page'
                 contentClassName='h-full'
                 title='Úprava údajů'
                 elementStart={ <FocusBackLink to='/account/edit' /> }>
      <h1 className='text-2xl font-bold'>Změna profilového obrázku</h1>



      <Avatar className='mx-auto' avatarUrl={ avatar !== null ? URL.createObjectURL(avatar) : me?.avatarUrl } name={ me?.name } />



      <Input
        type='file'
        accept='image/apng, image/avif, image/jpeg, image/png, image/webp'
        onChange={ handleChange }
      />



      <div className='flex flex-col gap-3 mt-auto m-0'>
        <Button
          color='primary'
          onClick={ handleSubmit }
          disabled={ isLoading }
          className='gap-2'
          startIcon={ isLoading ? <LoadingSpinner /> : null }
        >Uložit změny</Button>
      </div>



      <ModalSuccessfulChanges isShown={ isModalShown } hide={ handleModalClose } />
    </FocusLayout>
  )
}
