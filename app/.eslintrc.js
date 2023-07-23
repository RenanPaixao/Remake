module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'react-native/react-native': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'react',
    'react-native'
  ],
  'rules': {
    'indent': ['error', 2],
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-mixed-spaces-and-tabs': ['error'],
    'max-len': ['error', { 'code': 120 }],
    'object-curly-spacing': ['error', 'always']
  }
}
