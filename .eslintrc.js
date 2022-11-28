module.exports = {
  extends: [
    'plugin:wkovacs64/base',
    'plugin:wkovacs64/jest',
    'plugin:wkovacs64/typescript',
    'prettier',
  ],
  rules: {
    'jest/no-conditional-in-test': 'off',
    // doesn't work with vitest as it relies on jest version detection
    'jest/no-deprecated-functions': 'off',
    // TODO: remove once added to eslint-plugin-wkovacs64
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.*rc.{js,cjs,mjs}',
          '*.{config,setup}.{js,cjs,mjs}',
          '**/test.{js,jsx}',
          '**/test-*.{js,jsx}',
          '**/*{.,_}{test,spec}.{js,jsx}',
          '**/test/**',
          '**/tests/**',
          '**/spec/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          '**/cypress/**',
          '**/jest.config.{js,cjs,mjs}',
          '**/jest.setup.{js,cjs,mjs}',
          '**/setupTests.{js,cjs,mjs}',
          '**/setupProxy.{js,cjs,mjs}',
          '**/webpack.config.{js,cjs,mjs}',
          '**/webpack.config.*.{js,cjs,mjs}',
          '**/rollup.config.{js,cjs,mjs}',
          '**/rollup.config.*.{js,cjs,mjs}',
          '**/prettier.config.{js,cjs,mjs}',
          '**/vitest.config.{js,ts}',
        ],
      },
    ],
  },
  settings: {
    react: {
      // config hack to work around eslint-plugin-react crying
      version: '99999',
    },
  },
};
