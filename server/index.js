var path = require('path')
var routes = require('./routes')

var express = require('express')
var app = express()
var port = 4500

if(process.env.NODE_ENV === 'test'){
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware= require('webpack-hot-middleware')
  var config = require('../.config/webpack.test.config')
  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
}

//serve static files
//app.use('/static/',express.static(path.join(__dirname, 'dist')))

routes(app)

if(process.env.NODE_ENV === 'production'){
  app.listen(port, function(err){
    if(err){
      console.error(err)
    }else{
      console.info('Listen on port[' + port + ']')
    }
  })
}

export {app}
