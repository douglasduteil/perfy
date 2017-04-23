//

const { resolve } = require('path')

const { CheckerPlugin } = require('awesome-typescript-loader')
const { ProgressPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//

exports.default = {
  //

  context: __dirname,

  //

  entry: {
    index: './src/index.ts'
  },

  //

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  //

  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
  .concat(process.env.CI ? [] : [
    new ProgressPlugin()
  ]),

  //

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
