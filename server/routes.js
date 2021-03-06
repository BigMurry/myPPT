'use strict'

//import ppts from './controllers/ppts'
import './models'
import Slide from './controllers/slide'
import debug from 'debug'

const logger = debug('myapp')

const{
  load,
  search,
  loadSlide,
  getSlideByCreator,
  saveSlide,
  deleteSlide
} =Slide

import path from 'path'

export default function routes (app){
  let index = path.join(__dirname, '../client/index.html')

  if(process.env.NODE_ENV === 'production'){
    index =  path.join(__dirname, '../dist/index.html')
  }

//  app.post('/general/save', saveGeneral )
//  app.post('/slide/save', saveSlide)
//  app.delete('/slide/del', deleteSlide)
//  app.delete('/general/del', deleteGeneral)
  app.param('id', load)
  app.route('/slide/:id')
    .get(loadSlide)//load slide
    .put(saveSlide)//update slide
    //.post(createSlide)//create new
    .delete(deleteSlide)//delete slide
  //app.post('/login', login)
  //app.post('/logout', logout)

  app.post('/search', search)

  //app.get('/slides', getByUser)

  app.get('/slide/get/:id', loadSlide)
  app.post('/slide/search', search)
  app.post('/slide/getby', getSlideByCreator)
  app.post('/slide/save', saveSlide)
  app.delete('/slide/del/:id', deleteSlide)

  app.get('/',function(req, res){
    res.sendFile(index)
  })
}
