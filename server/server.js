var webpack = require('webpack')
var path = require('path')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware= require('webpack-hot-middleware')
var config = require('../config/webpack.config')

var express = require('express')
var app = express()
var port = 4500

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

//serve static files
//app.use('/static/',express.static(path.join(__dirname, 'dist')))

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname,'../client/index.html'))
})

app.listen(port, function(err){
  if(err){
    console.error(err)
  }else{
    console.info('Listen on port[' + port + ']')
  }
})
