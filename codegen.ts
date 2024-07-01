import type { CodegenConfig } from '@graphql-codegen/cli'



const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  documents: './src/graphql/*/@(queries|mutations)/*.graphql',
  generates: {
    './src/graphql/_generated/graphql.tsx': {
      config: {
        avoidOptionals: true
      },
      plugins: [ 'typescript', 'typescript-operations', 'typescript-react-apollo' ]
    }
  }
}



export default config
