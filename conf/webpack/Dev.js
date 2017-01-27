'use strict';

const path = require('path');

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      entry: [
        'webpack-dev-server/client?http://0.0.0.0:8000/',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './client.js'
      ],
      // externals: {
      //   react: 'React',
      //   'react-dom': 'ReactDOM'
      // },
      // entry: {
      //   vendor: ['react', 'react-dom', 'marked', 'highlight.js'],
      //   app: [
      //     'webpack-dev-server/client?http://0.0.0.0:8000/',
      //     'webpack/hot/only-dev-server',
      //     'react-hot-loader/patch',
      //     './client.js'
      //   ]
      // },
      // output: {
      //   path: path.resolve('./dist/assets'),
      //   filename: '[name].js',
      //   publicPath: './assets/'
      // },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'vendor',
        //   minChunks: Infinity,
        // })
      ]
    };
  }
}

module.exports = WebpackDevConfig;
