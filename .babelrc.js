// Note: this Babel config file is only used by Jest (babel-jest) when running
// tests. Babel configuration for build outputs is in rollup.config.js.

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
