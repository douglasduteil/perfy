//

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

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
