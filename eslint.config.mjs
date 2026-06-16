import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'dist/**', 'src/payload-types.ts', 'src/payload-generated-schema.ts'],
  },
]

export default config
