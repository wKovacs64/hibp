const path = require('path');

module.exports = {
  cache: true,
  entry: [
    path.join(__dirname, '..', 'src', 'hibp.js'),
  ],
  output: {
    library: 'hibp',
    libraryTarget: 'umd',
    path: path.join(__dirname, '..', 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
        ],
        include: [
          path.join(__dirname, '..', 'src'),
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
    module: 'empty',
  },
};
