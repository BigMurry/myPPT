'use strict'

//import ppts from './controllers/ppts'
import Slide from './controllers/slide'

const{
  load,
  search,
  loadSlide,
  saveSlide,
  deleteSlide
} =Slide

import path from 'path'

export default function routes (app){
  let index = path.join(__dirname, '../client/index.html')

  if(process.env.NODE_ENV === 'production'){
    index =  path.join(__dirname, '../dist/index.html')
  }
  app.get('*',function(req, res){
    res.sendFile(index)
  })

//  app.post('/general/save', saveGeneral )
//  app.post('/slide/save', saveSlide)
//  app.delete('/slide/del', deleteSlide)
//  app.delete('/general/del', deleteGeneral)
  app.param('id', load)
  app.get('/slide/get/:id', loadSlide)
  app.get('/slide/search', search)
  app.post('/slide/save', saveSlide)
  app.delete('/slide/del/:id', deleteSlide)
}
