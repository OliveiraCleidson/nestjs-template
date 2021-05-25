
module.exports = {

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: ['/node_modules/', 'tests-ci'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/core/(.*)': '<rootDir>/src/core/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}