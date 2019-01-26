module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '/test/'],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  modulePaths: ['<rootDir>/src', '<rootDir>/src/__mocks__'],
  testPathIgnorePatterns: ['cypress'],
  testEnvironment: 'node',
};
