module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-unused-vars': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
