const path = require('path');

const projectRoot = path.join(__dirname, '..');

module.exports = {
  cache: true,
  entry: [
    path.join(projectRoot, 'src', 'hibp.js'),
  ],
  output: {
    library: 'hibp',
    libraryTarget: 'umd',
    path: path.join(projectRoot, 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
        ],
        include: [
          path.join(projectRoot, 'src'),
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
    module: 'empty',
  },
};
