import React, { FC, ReactNode, useEffect } from 'react'
import { Stats, Button } from 'react-daisyui'
import { ArrowsClockwise } from 'phosphor-react'

import { useWeatherQuery } from '@graphql/_generated/graphql'
import { LoadingSpinner } from '@components/data-state/LoadingSpinner'
import { Notice } from '@components/data-state/Notice'
import translations from '@root/languages/translations'
import useLanguageContext from '@contexts/languageContext'
import { DataUnavailable } from '@components/data-state/DataUnavailable'



const Stat = Stats.Stat



interface CurrentWeatherProps {
  locationId: number,
  refetchKey?: string
}



export const CurrentWeatherStats: FC<CurrentWeatherProps> = ({ locationId, refetchKey }) => {
  // helpers
  const { language } = useLanguageContext()



  // graphql
  const weather = useWeatherQuery({
    variables: { locationId },
    notifyOnNetworkStatusChange: true
  })



  // refetch on update key change
  useEffect(() => {
    weather.refetch()
  }, [ refetchKey ])



  // container
  function wrapWithContainer(element: ReactNode) {
    return (
      <Stats className='shadow-md bg-base-100 rounded-box relative' vertical>
        { element }
      </Stats>
    )
  }



  // loading
  if (weather.loading)
    return wrapWithContainer(<Notice><LoadingSpinner /></Notice>)



  // error or no data
  if (weather.error || !weather.data)
    return wrapWithContainer(<DataUnavailable />)



  // main element
  return wrapWithContainer(
    <>
      <Stats className='border-none flex'>
        <Stat className='text-center border-none flex-grow'>
          <Stat.Item variant='title'>{ translations.temperature[language] }</Stat.Item>
          <Stat.Item variant='value'>{ weather.data.weather.temperature }</Stat.Item>
          <Stat.Item variant='desc'>°C</Stat.Item>
        </Stat>

        <Stat className='text-center border-none flex-grow'>
          <Stat.Item variant='title'>{ translations.humidity[language] }</Stat.Item>
          <Stat.Item variant='value'>{ weather.data.weather.humidity }</Stat.Item>
          <Stat.Item variant='desc'>%</Stat.Item>
        </Stat>
      </Stats>

      <Stats className='border-none flex'>
        <Stat className='text-center border-none flex-grow'>
          <Stat.Item variant='title'>{ translations.pressure[language] }</Stat.Item>
          <Stat.Item variant='value'>{ weather.data.weather.pressure }</Stat.Item>
          <Stat.Item variant='desc'>hPa</Stat.Item>
        </Stat>

        <Stat className='text-center border-none flex-grow'>
          <Stat.Item variant='title'>{ translations.windSpeed[language] }</Stat.Item>
          <Stat.Item variant='value'>{ weather.data.weather.windSpeed }</Stat.Item>
          <Stat.Item variant='desc'>m/s</Stat.Item>
        </Stat>
      </Stats>

      <div className='p-2 border-none'>
        <Button className='w-full'
                color='ghost'
                onClick={ () => weather.refetch() }
                endIcon={ <ArrowsClockwise weight='bold' size={ 24 } /> }>
          { translations.loadAgain[language] }
        </Button>
      </div>
    </>
  )
}
