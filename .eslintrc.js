module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['client/**/*.{js,jsx}'],
      env: {
        browser: true,
        es2021: true,
        jest: true,
      },
      extends: ['react-app', 'react-app/jest'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      files: ['server/**/*.js'],
      env: {
        node: true,
        es2021: true,
        jest: true,
      },
      extends: ['eslint:recommended'],
    },
  ],
};
