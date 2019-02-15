const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlwebpackplugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[chunkHash:8].js"
  },
  module: {
    rules: [
        {
          test: /.css$/,
            use: ['style-loader','css-loader']
        }
      ]
  },
  plugins: [
      new uglify(),
      new htmlwebpackplugin({
          filename: 'index.html',
          minify: {
            removeAttibuteQuotes: true
          },
          hash: true,
          chunks: ['index'],
          template: './src/pages/index.html'
      })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 1717
  }
}