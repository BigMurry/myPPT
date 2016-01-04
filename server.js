var webpack = require('webpack')
var path = require('path')
var config = require('./webpack.config')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware= require('webpack-hot-middleware')

var app = new (require('express'))()
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
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(err){
  if(err){
    console.error(err)
  }else{
    console.info('Listen on port[' + port + ']')
  }
})
