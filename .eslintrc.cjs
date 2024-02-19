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
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
  settings: {
    react: {
      // config hack to work around eslint-plugin-react crying
      version: '99999',
    },
  },
  overrides: [
    {
      files: ['playwright/tests/*.spec.ts'],
      extends: ['plugin:playwright/playwright-test'],
    },
  ],
};
