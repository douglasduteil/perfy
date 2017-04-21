//

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

  plugins: [
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
