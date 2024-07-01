import React, { FC } from 'react'
import { Menu, Button } from 'react-daisyui'
import { Plus } from 'phosphor-react'

import { AlertsMenuItem } from '@components/domain/alerts/AlertsMenuItem'
import useAlertsContext from '@contexts/alertsContext'
import { Notice } from '@components/data-state/Notice'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { DataUnavailable } from '@components/data-state/DataUnavailable'
import useAlertModal from '@hooks/useAlertModal'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export const AlertsMenu: FC = () => {
  // helpers
  const { language } = useLanguageContext()



  // data
  const { alertsQuery, allAlertsCountQuery } = useAlertsContext()



  // alert creation
  const { AlertModal, openModal } = useAlertModal()



  // loading
  if (alertsQuery.loading || allAlertsCountQuery.loading)
    return <Notice><LoadingSpinner /></Notice>



  // error or no data
  if (alertsQuery.error || !alertsQuery.data || allAlertsCountQuery.error || !allAlertsCountQuery.data)
    return <DataUnavailable />



  // main elements
  const CanCreate = allAlertsCountQuery.data.allAlertsCount < 32

  const CreateButton = (
    <Button
      color='primary'
      onClick={ openModal }
      endIcon={ <Plus weight='bold' /> }
    >
      { translations.create[language] }
    </Button>
  )

  const LimitNotice = (
    <Notice>{ translations.alertsLimitReached[language] }</Notice>
  )



  return (
    <>
      { alertsQuery.data.locationAlerts.length > 0 && (
        <Menu className='rounded-box p-2 gap-2'>
          { alertsQuery.data.locationAlerts.map(alert => (
            <AlertsMenuItem alert={ alert } key={ alert.id } />
          )) }
        </Menu>
      ) }

      { CanCreate ? CreateButton : LimitNotice }

      { AlertModal }
    </>
  )
}
