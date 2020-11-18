module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',

  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: 'webpack.config.dev.js',
      },
      'typescript': {
        'alwaysTryTypes': true,
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
    'react/static-property-placement': [0],
    'react/no-array-index-key': [0],
    'react/prop-types': [0],
    'react/prefer-stateless-function': [0],
    'react/jsx-props-no-spreading': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'no-unused-expressions': [0],
    'no-use-before-define': [0],
    'no-nested-ternary': [0],
    'linebreak-style': [0],
    'import/extensions': [2, 'ignorePackages', {
      'ts': 'never',
      'tsx': 'never',
    }],
    quotes: [2, 'single'],
    semi: [2, 'always'],
  },
};
