var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry:'./index',
  output:{
    filename:'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loaders:['babel']
      },{
        test: /\.css$/,
        loaders:['style', 'raw'],
        include:__dirname
      },{
        test:/\.json$/,
        loaders:['file'],
        include:path.join(__dirname,'resources')
      }
    ]
  },
  resolve:{
    extensions:['', '.js']
  }
}
