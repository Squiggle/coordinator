var path = require('path')  
var webpack = require('webpack')  
var copyWebpackPlugin = require('copy-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {  
  context: __dirname,
  entry: [
    'whatwg-fetch',
    './src/app/App.tsx'
  ],
  dev: {
    historyApiFallback: {
      main: './index.html'
    }
  },
  output: {
    path: path.resolve('./Coordinator.Web/www'),
    publicPath: '/Coordinator.Web/www/',  // Used by webpack-dev-server
    // or '[name]-[hash].js' if you can dynamically load JS, so you don't have to always invalidate cache.
    filename: '[name].js'
  },
  devtool: 'source-map',  // for debugging

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new copyWebpackPlugin([
      { from: './src/app/assets/img', to: 'assets/img' },
      { from: 'index.html' }
    ])
  ],

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.scss?$/, loaders: ['style', 'css', 'sass']}
    ],

    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.ts', '.tsx']
  }
}