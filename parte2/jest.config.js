module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.{js,ts}', '!**/node_modules/**'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
