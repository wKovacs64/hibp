import path from 'path';
import webpack from 'webpack';

const projectRoot = path.join(__dirname, '..');

export default {
  cache: true,
  node: false,
  target: 'web',
  entry: [
    path.join(projectRoot, 'src', 'hibp.js'),
  ],
  output: {
    library: 'hibp',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    path: path.join(projectRoot, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(projectRoot, 'src'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: [
                        '> 1%',
                        'last 2 versions',
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
