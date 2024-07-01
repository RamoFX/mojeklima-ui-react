import React, { FC, ChangeEvent } from 'react'
import { Menu, Checkbox } from 'react-daisyui'

import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import useAlertsContext, { existingAlert, commonAlert } from '@contexts/alertsContext'
import useAlertModal from '@hooks/useAlertModal'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



interface AlertsMenuItemProps {
  alert: commonAlert
}



export const AlertsMenuItem: FC<AlertsMenuItemProps> = ({ alert }) => {
  // helpers
  const { language } = useLanguageContext()

  function criteriaToLocale(criteria: commonAlert['criteria']) {
    switch (criteria) {
      case 'TEMPERATURE':
        return translations.temperature[language]

      case 'HUMIDITY':
        return translations.humidity[language]

      case 'WIND_SPEED':
        return translations.windSpeed[language]

      case 'PRESSURE':
        return translations.pressure[language]
    }
  }

  function comparatorToSymbol(comparator: commonAlert['comparator']) {
    switch (comparator) {
      case 'LESS_THAN':
        return <span>&lt;</span>

      case 'LESS_THAN_OR_EQUAL_TO':
        return <span>&le;</span>

      case 'EQUAL_TO':
        return '='

      case 'GREATER_THAN_OR_EQUAL_TO':
        return <span>&ge;</span>

      case 'GREATER_THAN':
        return <span>&gt;</span>
    }
  }



  // data
  const { toggleAlert, toggling } = useAlertsContext()



  // alert creation, update and deletion
  const { AlertModal, openModal } = useAlertModal(alert as existingAlert)



  // event handlers
  async function handleEnabledChange(event: ChangeEvent<HTMLInputElement>) {
    if (!alert.id)
      return

    const id = alert.id
    const isEnabled = event.target.checked

    await toggleAlert(id, isEnabled)
  }



  // elements
  const showAlertMessage = alert.message.trim().length > 0

  const AlertMessage = <span className='text-sm opacity-75'>{ alert.message }</span>

  const ToggleLoader = <LoadingSpinner />

  const IsEnabled = <Checkbox checked={ alert.isEnabled } onChange={ handleEnabledChange } />

  return (
    <>
      <Menu.Item key={ alert.id }>
        <button color='ghost' className='items-start'>
          <div className='w-6 h-6'>
            { toggling ? ToggleLoader : IsEnabled }
          </div>

          <div className='flex flex-col text-left w-full' onClick={ openModal }>
            <div className='flex flex-row justify-between w-full font-medium'>
              <span>{ criteriaToLocale(alert.criteria) } { comparatorToSymbol(alert.comparator) } { alert.value }</span>

              <span>{ alert.updateFrequency } { translations.hoursShort[language] }</span>
            </div>

            { showAlertMessage && AlertMessage }
          </div>
        </button>
      </Menu.Item>

      { AlertModal }
    </>
  )
}
