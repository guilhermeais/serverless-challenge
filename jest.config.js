module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node'
}
