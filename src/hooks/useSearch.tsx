import React, { useState, ChangeEvent, useEffect } from 'react'
import { ArrowLeft, Backspace } from 'phosphor-react'
import { Input } from 'react-daisyui'
import { emptyFunction } from '@utilities/common'
import useLanguageContext from '@contexts/languageContext'
import translations from '@root/languages/translations'



export interface useSearchProps {
  placeholder?: string,
  AdditionalIcon?: typeof ArrowLeft,
  handleAdditinalClick?: () => void,
  lazy?: boolean
}



export default function useSearch({ placeholder, AdditionalIcon, handleAdditinalClick, lazy }: useSearchProps = {}) {
  // search logic
  const [ queryImmediate, setQueryImmediate ] = useState('')

  function clear() {
    setQueryImmediate('')
  }



  // lazy
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    if (!lazy || queryImmediate.length === 0) {
      setQuery(queryImmediate)

      return
    }

    const timeoutId = setTimeout(() => setQuery(queryImmediate), 500)
    return () => clearTimeout(timeoutId)
  }, [ queryImmediate ])



  // event handlers
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setQueryImmediate(event.target.value)
  }

  function handleClearClick() {
    setQueryImmediate('')
  }



  // helpers
  const { language } = useLanguageContext()

  function wrapIcon(Icon: typeof ArrowLeft, handleClick: () => void) {
    return (
      <div className={ `absolute top-0 p-3 cursor-pointer right-0` } onClick={ handleClick }>
        <Icon />
      </div>
    )
  }

  const ShowClearSearch = queryImmediate.length > 0



  // elements
  const ClearSearchIcon = wrapIcon(Backspace, handleClearClick)
  const AdditionalSearchIcon = AdditionalIcon && wrapIcon(AdditionalIcon, handleAdditinalClick ?? emptyFunction)

  const SearchBar = (
    <div className='relative'>
      <Input
        type='text'
        name='search'
        value={ queryImmediate }
        color='ghost'
        placeholder={ placeholder ?? translations.search[language] }
        onChange={ handleSearchChange }
        className='w-full'
      />

      { ShowClearSearch ? ClearSearchIcon : AdditionalSearchIcon }
    </div>
  )



  return {
    SearchBar,
    query,
    clear
  }
}
