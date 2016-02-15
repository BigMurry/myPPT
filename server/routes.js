'use strict'

import ppts from './controllers/ppts'

let{
  saveGeneral,
  saveSlide,
  deleteSlide,
  deleteGeneral
} = ppts

import path from 'path'

export default function routes (app){
  let index = path.join(__dirname, '../client/index.html')

  if(process.env.NODE_ENV === 'production'){
    index =  path.join(__dirname, '../dist/index.html')
  }
  app.get('*',function(req, res){
    res.sendFile(index)
  })

  app.post('/general/save', saveGeneral )
  app.post('/slide/save', saveSlide)
  app.delete('/slide/del', deleteSlide)
  app.delete('/general/del', deleteGeneral)
}
