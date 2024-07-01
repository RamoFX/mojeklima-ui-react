import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getPreferredLanguage } from '@utilities/translation'



// setup
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  const language = localStorage.getItem('language')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${ JSON.parse(token) }` : '',
      'Preferred-Language': language ? JSON.parse(language) : getPreferredLanguage()
    }
  }
})



// prepare
const link = authLink.concat(httpLink)
const cache = new InMemoryCache()



// define
export const client = new ApolloClient({ link, cache })
