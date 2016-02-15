'use strict'

import path from 'path'
import routes from './routes'
import express from 'express'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../.config/webpack.test.config'

const port = 4500
let app = express()

//development only
if(process.env.NODE_ENV === 'development'){
  let compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
}

//serve static files
//app.use('/static/',express.static(path.join(__dirname, 'dist')))

routes(app)

//development and production
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
