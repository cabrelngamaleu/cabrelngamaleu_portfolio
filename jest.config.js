module.exports = {
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/**/*.test.{js,jsx}'],
      setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.js'],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/client/__mocks__/fileMock.js',
      },
      transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['react-app'] }],
      },
      coverageDirectory: '<rootDir>/client/coverage',
      collectCoverageFrom: [
        'client/src/**/*.{js,jsx}',
        '!client/src/index.js',
        '!client/src/reportWebVitals.js',
        '!client/src/**/*.test.{js,jsx}',
      ],
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
      coverageDirectory: '<rootDir>/server/coverage',
      collectCoverageFrom: [
        'server/**/*.js',
        '!server/server.js',
        '!server/tests/**',
        '!server/scripts/**',
        '!server/node_modules/**',
      ],
      coverageThreshold: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  ],
};
