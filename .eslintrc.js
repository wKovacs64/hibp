module.exports = {
  extends: ['@wkovacs64/eslint-config-ts'],
  settings: {
    'import/resolver': {
      jest: {
        jestConfigFile: './jest.config.js',
      },
      node: {
        extensions: ['.js', '.ts'],
        paths: ['src', 'src/__mocks__'],
      },
    },
  },
};
