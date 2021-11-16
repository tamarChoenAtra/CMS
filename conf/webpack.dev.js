const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = env =>
  merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, '../public'),
      compress: true,
      historyApiFallback: true,
      port: 3006,
      https: false,
    },
  })
