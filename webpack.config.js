const path = require('path');
const glob = require('glob');
const uglify = require('uglifyjs-webpack-plugin');
const htmlwebpackplugin = require('html-webpack-plugin');
const extractextwebpackplugin = require('extract-text-webpack-plugin');

const PurifyCssPlugin = require('purifycss-webpack');

const cleanwebpackplugin = require('clean-webpack-plugin')

// 多个css文件
const extractCSS = new extractextwebpackplugin('css/[name]-one.css');
const extractLESS = new extractextwebpackplugin('less/[name]-two.css');
var website = {
    publicPath: "http://127.0.0.1:1717/"
}

module.exports = {
  mode: 'development',
  entry: {
      index: './src/js/index.js',
      hello: './src/js/hello.js'
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "js/[name].[chunkHash:8].js",
      publicPath: website.publicPath
  },
  module: {
    rules: [
        {
            test: /.css$/,
            use: extractCSS.extract({
                fallback: 'style-loader',
                use: [{loader: "css-loader", options: {importLoaders: 1}}, 'postcss-loader']
            })
        },
        {
            test: /\.less$/,
            use: extractLESS.extract({
                use: [{
                        loader: "css-loader",
                    },{
                    loader: "less-loader"
                }],
                fallback: 'style-loader'
            })
        },
        {
            test: /.(png|jpg|gif)/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 500,
                    outputPath: 'images/'
                }
            }]
        },
        {
            test: /\.(html|htm)$/i,
            use: ['html-withimg-loader']
        },
        {
            test: /\.(jsx|js)$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        }
      ]
  },
  plugins: [
      // new uglify(),
      new htmlwebpackplugin({
          filename: 'index.html',
          minify: {
            removeAttibuteQuotes: true
          },
          hash: true,
          chunks: ['index', 'hello'],
          template: './src/pages/index.html'
      }),
      extractCSS,
      extractLESS,
      new PurifyCssPlugin({
          paths: glob.sync(path.join(__dirname, 'src/pages/*.html'))
      }),
      new cleanwebpackplugin(['dist'])
      // new extractextwebpackplugin("/css/index.css")
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: 'localhost',
    port: 1717
  }
}