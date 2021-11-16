module.exports = {
  verbose: true,
  testMatch: ['**/src/**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    'Assets(.*)$': '<rootDir>/src/assets$1',
    'Config(.*)$': '<rootDir>/src/config$1',
    'Lib(.*)$': '<rootDir>/src/lib$1',
    'Views(.*)$': '<rootDir>/src/views$1',
  },
}
