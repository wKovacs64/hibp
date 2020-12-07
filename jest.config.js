module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/test',
    '/__tests__/',
    'mocks',
    'index.ts',
  ],
  coverageReporters: ['html', 'json', 'lcov', 'text'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  testPathIgnorePatterns: ['cypress'],
  testEnvironment: 'node',
};
