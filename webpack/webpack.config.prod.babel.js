import webpack from 'webpack';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import baseConfig from './webpack.config.base.babel';

export default merge.smart(baseConfig, {
  devtool: 'source-map',
  output: {
    filename: `${baseConfig.output.library}.min.js`,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BabiliPlugin({}, {
      comments: false,
    }),
  ],
});
