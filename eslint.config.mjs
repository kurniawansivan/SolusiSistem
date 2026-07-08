// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(eslintConfigPrettier, {
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'vue/no-unused-components': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}, {
  files: ['scripts/**/*.mjs'],
  rules: {
    'no-console': 'off',
  },
})
