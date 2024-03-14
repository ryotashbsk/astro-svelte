module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:astro/recommended', 'plugin:svelte/recommended', 'prettier'],
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true
      }
    ],
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        'newlines-between': 'always',
        'pathGroupsExcludedImportTypes': ['builtin'],
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'class-methods-use-this': 'off',
    'no-restricted-globals': 'off',
    'no-nested-ternary': 'off',
    'no-console': 'off',
    'no-bitwise': 'off',
    'no-undef': 'off',
    'no-control-regex': 'off',
    'svelte/no-at-html-tags': 'off'
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        'astro/no-unused-css-selector': 'error',
        'astro/prefer-object-class-list': 'error'
      }
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-tslint-comment': 'error'
      }
    },
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.svelte']
      }
    }
  ],
  ignorePatterns: []
};
