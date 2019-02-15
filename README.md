# webpack
webpack.config.js热更新配置
devServer: {
    contentBase: path.resolve(__dirname, 'dist'),  //打包的目录名
    compress: true,  //是否开启服务器压缩
    host: 'localhost', //本地ip
    port: 1717  //端口号
  }
