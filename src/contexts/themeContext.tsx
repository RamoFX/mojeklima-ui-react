import React, { createContext, FC, useContext, ReactNode, useState, useEffect } from 'react'
import { Theme as UiTheme, useTheme as useDaisyUiTheme } from 'react-daisyui'



const ThemeContext = createContext<ReturnType<typeof useTheme> | null>(null)



interface ThemeProviderProps {
  children: ReactNode
}



export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { theme, selectTheme, deselectTheme } = useTheme()

  return (
    <ThemeContext.Provider value={ { theme, selectTheme, deselectTheme } }>
      <UiTheme dataTheme={ theme }>
        { children }
      </UiTheme>
    </ThemeContext.Provider>
  )
}



export default function useThemeContext() {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('"useThemeContext" should be used within <ThemeProvider/>.')
  }

  return context
}



export enum Theme {
  light = 'light',
  dark  = 'dark'
}



function useTheme() {
  // preparation
  const mediaQuery = '(prefers-color-scheme: dark)'
  const daisyUiTheme = useDaisyUiTheme()



  // user preference
  function hasUserPreference() {
    return Boolean(localStorage.theme)
  }

  function getUserPreference() {
    if (!hasUserPreference())
      return null

    return localStorage.theme
  }

  function setUserPreference(preferredTheme: Theme) {
    localStorage.theme = preferredTheme
  }

  function removeUserPreference() {
    localStorage.removeItem('theme')
  }



  // system preference
  function getSystemPreference() {
    const prefersDark = window.matchMedia(mediaQuery).matches

    return prefersDark ? Theme.dark : Theme.light
  }



  // user actions
  function selectTheme(theme: Theme) {
    setUserPreference(theme)
    setTheme(theme)
  }

  function deselectTheme() {
    removeUserPreference()
    const theme = getSystemPreference()
    setTheme(theme)
  }



  // events
  function systemPreferenceChanged(args: MediaQueryListEvent) {
    if (hasUserPreference())
      return

    const theme = getSystemPreference()
    setTheme(theme)
  }



  // main helpers
  function getCurrentPreference() {
    if (hasUserPreference()) {
      return getUserPreference()
    } else {
      return getSystemPreference()
    }
  }

  function initialSetup() {
    // event handler
    const mediaQueryList = window.matchMedia(mediaQuery)
    mediaQueryList.addEventListener('change', systemPreferenceChanged)

    return function cleanup() {
      mediaQueryList.removeEventListener('change', systemPreferenceChanged)
    }
  }

  function applyNewTheme() {
    if (!theme)
      return

    // tailwind implementation
    /*
    const htmlClasses = document.documentElement.classList

    if (theme === Theme.dark) {
      htmlClasses.add('dark')
    } else {
      htmlClasses.remove('dark')
    }
    */

    // daisy ui implementation
    daisyUiTheme.setTheme(theme)
  }



  // main
  const [ theme, setTheme ] = useState<Theme>(getCurrentPreference())

  useEffect(initialSetup, [])

  useEffect(applyNewTheme, [ theme ])



  return {
    selectTheme,
    deselectTheme,
    theme
  }
}
