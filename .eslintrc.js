module.exports = {
  env: {
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'valid-jsdoc': [
      'error',
      {
        prefer: {
          arg: 'param',
          argument: 'param',
          return: 'returns',
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      jest: {
        jestConfigFile: './jest.config.js',
      },
    },
  },
};
