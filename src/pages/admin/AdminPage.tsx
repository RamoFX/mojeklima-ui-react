import React from 'react'
import { Button } from 'react-daisyui'

import { FocusLayout } from '@components/layouts/FocusLayout'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useTitle from '@hooks/useTitle'
import { useNotifyMutation, NotifyMutationVariables } from '@graphql/_generated/graphql'



export default function AdminPage() {
  useTitle('Administrátorská stránka')

  // const usePush (16, 107)
  const [ notify, notifyDetails ] = useNotifyMutation()

  function handleClick() {
    const variables: NotifyMutationVariables = {
      accountId: 1,
      alertId: 200
    }

    notify({ variables })
  }

  return (
    <FocusLayout title='Administrátorská správa'>
      <Button onClick={ handleClick }
              color='primary'
              startIcon={ notifyDetails.loading ? <LoadingSpinner /> : null }
              disabled={ notifyDetails.loading }>Vyvolat upozornění</Button>

      <pre>{ JSON.stringify(notifyDetails.data, null, 2) }</pre>
    </FocusLayout>
  )
}
