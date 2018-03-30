module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/test/'],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/es', '<rootDir>/lib'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['test-umd'],
};
