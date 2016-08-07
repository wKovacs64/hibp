var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  cache: true,
  entry: [
    path.join(__dirname, 'src/hibp.js')
  ],
  output: {
    library: 'hibp',
    libraryTarget: 'umd',
    filename: 'hibp.min.js',
    path: path.join(__dirname, 'lib')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: [path.join(__dirname, 'src')]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
