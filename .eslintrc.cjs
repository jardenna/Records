module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
  ],
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'typescript-sort-keys'],
  rules: {
    'typescript-sort-keys/interface': [
      'warn',
      'asc',
      { caseSensitive: true, requiredFirst: true },
    ],
    'typescript-sort-keys/string-enum': [
      'warn',
      'asc',
      { caseSensitive: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',

    'import/no-extraneous-dependencies': [
      'error',
      {
        peerDependencies: true,
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: ['arrow-function', 'function-declaration'],
        unnamedComponents: 'arrow-function',
      },
    ],
    curly: ['error', 'all'],
    'arrow-body-style': 'warn',
    'react/no-multi-comp': ['error', { ignoreStateless: false }],
    'react/no-unescaped-entities': 0,
    'no-underscore-dangle': ['error', { allow: ['__esModule', '__extends'] }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-console': ['warn', { allow: ['warn'] }],
    'no-warning-comments': [
      'error',
      { terms: ['todo', 'fixme', 'any other term'], location: 'anywhere' },
    ],
    camelcase: 'off',
    'react/destructuring-assignment': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/no-did-update-set-state': 'warn',
    'class-methods-use-this': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/no-array-index-key': 'off',
    'react/no-direct-mutation-state': 1,
    'no-nested-ternary': 'warn',
    'no-prototype-builtins': 'off',
    'react/sort-comp': 'off',
    'no-shadow': 'off',
    'react/require-default-props': [
      'error',
      { ignoreFunctionalComponents: true },
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowFunctions: true,
      },
    ],
    'import/prefer-default-export': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/html-has-lang': ['error'],
    'jsx-a11y/img-redundant-alt': [
      2,
      {
        components: ['Image'],
        words: ['Bild', 'Foto', 'Billede'],
      },
    ],
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['Label'],
        labelAttributes: ['for'],
        controlComponents: ['Input'],
        depth: 4,
      },
    ],
  },

  globals: {
    JSX: true,
  },
  ignorePatterns: ['build'],
};
