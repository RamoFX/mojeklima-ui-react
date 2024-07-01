const { alias } = require('react-app-rewire-alias')



module.exports = function override(config) {
  alias({
    '@root': 'src',
    '@assets': 'src/assets',
    '@models': 'src/models',
    '@router': 'src/router',
    '@graphql': 'src/graphql',
    '@utilities': 'src/utilities',
    '@components': 'src/components',
    '@pages': 'src/pages',
    '@hooks': 'src/hooks',
    '@contexts': 'src/contexts',
    '@errors': 'src/errors',
    '@styles': 'src/styles'
  })(config)

  return config
}
