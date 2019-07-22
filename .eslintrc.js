module.exports = {
  extends: [
    'plugin:wkovacs64/base',
    'plugin:wkovacs64/jest',
    'plugin:wkovacs64/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
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
