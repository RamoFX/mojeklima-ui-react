import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ApolloProvider } from '@apollo/client'

import { client } from '@graphql/client'
import { Routes } from '@components/navigation/Routes'
import { ThemeProvider } from '@contexts/themeContext'
import { WebAlertsProvider } from '@contexts/webAlertsContext'
import UnexpectedErrorPage from '@pages/special/UnexpectedErrorPage'
import { AuthenticationProvider } from '@contexts/authenticationContext'
import { PublicAccountProvider } from '@contexts/publicAccountContext'
import { LoadingProvider } from '@contexts/loadingContext'
import { IconProvider } from '@contexts/iconContext'
import { LanguageProvider } from '@contexts/languageContext'



// TODO: Handle offline
function Application() {
  return (
    <ThemeProvider>
      <IconProvider>
        <LanguageProvider>
          <ErrorBoundary FallbackComponent={ UnexpectedErrorPage }>
            <LoadingProvider>
              <WebAlertsProvider>
                <ApolloProvider client={ client }>
                  <AuthenticationProvider>
                    <PublicAccountProvider>
                      <Routes />
                    </PublicAccountProvider>
                  </AuthenticationProvider>
                </ApolloProvider>
              </WebAlertsProvider>
            </LoadingProvider>
          </ErrorBoundary>
        </LanguageProvider>
      </IconProvider>
    </ThemeProvider>
  )
}



export default Application
