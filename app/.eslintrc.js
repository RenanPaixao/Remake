module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'node': true,
    'react-native/react-native': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'import',
    'unused-imports',
    'import'
  ],
  rules: {
    'indent': ['error', 2],
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'semi': ['error', 'never'],
    'no-mixed-spaces-and-tabs': ['error'],
    'max-len': ['error', { 'code': 120 }],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        asyncArrow: 'always',
        named: 'never'
      }
    ],
    'space-before-blocks': ['error', 'always'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'no-multi-spaces': ['error'],
    'no-trailing-spaces': ['error'],
    'space-infix-ops': ['error' ],
    'key-spacing': ['error', { 'beforeColon': false }],
    'keyword-spacing': ['error', { after: true, before: true }],
    'eqeqeq': ['error', 'always'],
    'require-await': ['error'],
    'curly': ['error'],
    'block-scoped-var': ['error'],
    'func-call-spacing': ['error', 'never'],
    'import/no-duplicates': ['error'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-unreachable': ['error'],
    'no-unused-vars': ['off'],
    'no-var': 'error',
    'prefer-destructuring': [
      'error', {
        array: false,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'space-in-parens': ['error', 'never'],
    'unused-imports/no-unused-imports': ['error']
  }
}
