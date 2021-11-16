const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const getEnvKeys = env => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(`${__dirname}/..`)

  // Create the fallback path (the production .env)
  const defaultPath = `${currentPath}/.env`

  // We're concatenating the environment name to our filename to specify the correct env file!
  let filename = '.env'
  if (env.ENVIRONMENT === 'production') {
    filename = 'setenv.sh'
  } else {
    filename = `.env.${env.ENVIRONMENT}`
  }
  const envPath = `${currentPath}/${filename}`

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : defaultPath

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed

  return Object.keys(fileEnv)
}

module.exports = env => ({
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CopyPlugin([
      {
        from: './public/favicon.ico',
        to: 'favicon.ico',
      },
    ]),
    new webpack.EnvironmentPlugin(getEnvKeys(env)),
  ],
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, '../src/assets/'),
      Config: path.resolve(__dirname, '../src/config/'),
      Lib: path.resolve(__dirname, '../src/lib/'),
      Views: path.resolve(__dirname, '../src/views/'),
      axios: path.resolve(__dirname, '../node_modules/axios'),
    },
    extensions: ['.scss', '.jsx', '.js', '.json'],
  },
})
