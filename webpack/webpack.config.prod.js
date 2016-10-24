const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);

config.devtool = 'source-map';
config.output.filename = config.output.library + '.min.js';
config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
];

module.exports = config;
