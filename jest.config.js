module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/test/'],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['test-umd'],
};
