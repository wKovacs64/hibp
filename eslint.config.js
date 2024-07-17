import baseConfig from '@wkovacs64/eslint-config';

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  ...baseConfig,
  {
    ignores: ['example'],
  },
];

export default config;
