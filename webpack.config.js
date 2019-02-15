const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  module: {

  },
  plugins: [],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 1717
  }
}