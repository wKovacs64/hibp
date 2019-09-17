module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/test',
    '/__tests__/',
  ],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/src',
    '<rootDir>/src/__mocks__',
  ],
  testPathIgnorePatterns: ['cypress'],
  testEnvironment: 'node',
};
