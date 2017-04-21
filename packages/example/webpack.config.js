//

const { CheckerPlugin } = require('awesome-typescript-loader')

const { ProgressPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//

exports.default = {
  //

  context: __dirname,

  //

  entry: {
    'long-execution-time': './src/cases/long-execution-time/index.ts'
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
      inject: false,
      template: './src/cases/long-execution-time/index.html'
    })
  ]
  .concat(process.env.CI ? [] : [
    new ProgressPlugin()
  ]),

  //

  output: {
    filename: 'bundle.js'
  }
}
