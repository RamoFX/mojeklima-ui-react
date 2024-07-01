import React, { useState, useRef, useMemo } from 'react'
import { useUpdate } from 'react-use'
import { Stats, RadialProgress, Tabs } from 'react-daisyui'

import { MainLayout } from '@components/layouts/MainLayout'
import { classes } from '@utilities/common'
import { Location, useAllAlertsCountQuery } from '@graphql/_generated/graphql'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { NoDataError } from '@errors/NoDataError'
import useTitle from '@hooks/useTitle'
import { CurrentWeatherStats } from '@components/domain/CurrentWeatherStats'
import useLocationsContext from '@contexts/locationsContext'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



const Stat = Stats.Stat



interface TabsData extends Pick<Location, 'id' | 'name'> {
}



export default function OverviewPage() {
  // helpers
  const { language } = useLanguageContext()
  const update = useUpdate()
  useTitle(translations.overview[language])



  // graphql
  const { locationsQuery } = useLocationsContext()
  const allAlertsCountQuery = useAllAlertsCountQuery()



  // stats
  const maxAlertsCount = 32
  const alertsUsage = useMemo(
    () => Math.round(
      (
        allAlertsCountQuery.data?.allAlertsCount ?? 0
      ) / maxAlertsCount * 100),
    [ allAlertsCountQuery.data ]
  )



  // tabs
  const tabsData: TabsData[] = useMemo(
    () => (
      locationsQuery.data?.locations ?? []
    ).map(
      ({ id, name }) => (
        { id, name }
      )
    ),
    [ locationsQuery.data ]
  )

  const initialTabValue = useMemo(() => {
    return tabsData.length > 0 ? tabsData[0].id : null
  }, [ tabsData ])

  const [ tabValue, setTabValue ] = useState<TabsData['id'] | null>(null)



  // tab fades
  const tabsRef = useRef<HTMLDivElement>(null)

  const fades = useMemo(() => (
    {
      left: (
              tabsRef.current?.scrollLeft ?? 0
            ) > 0,
      right: (
               tabsRef.current?.scrollLeft ?? 0
             ) + (
               tabsRef.current?.clientWidth ?? 0
             ) < (
               tabsRef.current?.scrollWidth ?? 1
             )
    }
  ), undefined)



  // handle loading
  if (locationsQuery.loading || allAlertsCountQuery.loading)
    return (
      <MainLayout>
        <div className='flex justify-center items-center h-48'>
          <LoadingSpinner size={ 32 } />
        </div>
      </MainLayout>
    )

  if (locationsQuery.error)
    throw locationsQuery.error

  if (allAlertsCountQuery.error)
    throw allAlertsCountQuery.error

  if (locationsQuery.data === undefined)
    throw new NoDataError()

  if (allAlertsCountQuery.data === undefined)
    throw new NoDataError()



  return (
    <MainLayout>
      { locationsQuery.data.locations.length > 0 ? (
        <>
          <span className='font-bold text-4xl'>{ translations.currently[language] }</span>



          <div className='flex flex-col gap-4'>

            <div className='relative'>
              <Tabs
                className='font-semibold flex-nowrap overflow-x-auto'
                boxed
                value={ tabValue ?? initialTabValue }
                onChange={ setTabValue }
                onScroll={ update }
                ref={ tabsRef }
              >
                { tabsData.map((tabData) => (
                  <Tabs.Tab className='flex-shrink-0' value={ tabData.id } key={ tabData.id }>{ tabData.name }</Tabs.Tab>
                )) }
              </Tabs>

              <div className={ classes(fades.left ? 'fade-left' : 'fade-left-hidden') } />

              <div className={ classes(fades.right ? 'fade-right' : 'fade-right-hidden') } />
            </div>



            <CurrentWeatherStats locationId={ (
              tabValue ?? initialTabValue
            ) as number } />
          </div>
        </>
      ) : <></> }



      <span className='font-bold text-4xl'>{ translations.overview[language] }</span>



      <div className='flex flex-col gap-4'>

        <div className='flex flex-row gap-4'>
          <Stat className='bg-base-100 rounded-box text-center shadow-md'>
            <Stat.Item variant='value'>{ locationsQuery.data.locations.length }</Stat.Item>
            <Stat.Item variant='title'>{ translations.locationsCount[language] }</Stat.Item>
          </Stat>

          <Stat className='bg-base-100 rounded-box text-center shadow-md'>
            <Stat.Item variant='value'>{ allAlertsCountQuery.data.allAlertsCount }</Stat.Item>
            <Stat.Item variant='title'>{ translations.alertsCount[language] }</Stat.Item>
          </Stat>
        </div>



        <Stat
          className={ classes(
            'rounded-box shadow-md',
            alertsUsage === 100
            ? 'bg-error text-error-content'
            : alertsUsage >= 75
              ? 'bg-warning text-warning-content'
              : 'bg-base-100'
          ) }
        >
          <Stat.Item variant='figure'>
            <RadialProgress value={ alertsUsage }>{ alertsUsage }%</RadialProgress>
          </Stat.Item>
          <Stat.Item
            variant='title' className={ classes(
            alertsUsage === 100
            ? 'text-error-content/75'
            : alertsUsage >= 75
              ? 'text-warning-content/60'
              : null
          ) }
          >{ translations.alertsLimit[language] }</Stat.Item>
          <Stat.Item variant='value'>{ allAlertsCountQuery.data.allAlertsCount }/{ maxAlertsCount }</Stat.Item>
        </Stat>

      </div>
    </MainLayout>
  )
}
