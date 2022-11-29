module.exports = {
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress'],
  parserOptions: {
    project: 'cypress/tsconfig.json',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'jest/valid-expect': 'off',
    'jest/valid-expect-in-promise': 'off',
  },
};
