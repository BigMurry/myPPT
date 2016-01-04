var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry:[
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output:{
    filename:'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  plugins:[
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module:{
    loaders:[
      {
        test:/\.jsx?$/,
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
