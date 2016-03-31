'use strict'

import path from 'path'
import routes from './routes'
import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import redisConnect from 'connect-redis'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../.config/webpack.test.config'


const port = 4500
const redisStore = redisConnect(session)
let app = express()

//NOTE:development only
if(process.env.NODE_ENV === 'development'){
  let compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
}
app.use(session({
  store: new redisStore(),
  secret: 'ppt future'
}))
app.use(bodyParser.json())
//serve static files
//app.use('/static/',express.static(path.join(__dirname, 'dist')))

routes(app)

//NOTE:development and production
if(process.env.NODE_ENV !== 'test'){
  app.listen(port, function(err){
    if(err){
      console.error(err)
    }else{
      console.info('Listen on port[' + port + ']')
    }
  })
}

export {app}
