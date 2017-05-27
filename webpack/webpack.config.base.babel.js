import path from 'path';

const projectRoot = path.join(__dirname, '..');

export default {
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
              plugins: [
                'add-module-exports',
              ],
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
  node: {
    fs: 'empty',
    module: 'empty',
    Buffer: false, // axios 0.16.1
  },
};
