var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry:[
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    './client/index'
  ],
  output:{
    filename:'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/static/'
  },
  plugins:[
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'Promise':'es6-promise',
      'fetch':'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],
  module:{
    loaders:[
      {
        test:/\.jsx?$/,
        exclude:/node_modules/,
        loaders:['babel']
      },{
        test: /\.scss$/,
        loaders:['style', 'css', 'sass'],
        include:path.join(__dirname,'../client/styles')
      },{
        test:/\.scss$/,
        loaders:['style', 'css?module=local', 'sass'],
        include:path.join(__dirname, '../client'),
        exclude:path.join(__dirname, '../client/styles')
      },{
        test:/\.json$/,
        loaders:['file'],
        include:path.join(__dirname,'../client/resources')
      }
    ]
  },
  resolve:{
    extensions:['', '.js']
  }
}
