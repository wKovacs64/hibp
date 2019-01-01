module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '/test/'],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  modulePaths: ['<rootDir>/src', '<rootDir>/src/__mocks__'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.(j|t)s?(x)'],
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
};
