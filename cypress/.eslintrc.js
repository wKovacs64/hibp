module.exports = {
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'jest/valid-expect': 'off',
    'jest/valid-expect-in-promise': 'off',
  },
};
