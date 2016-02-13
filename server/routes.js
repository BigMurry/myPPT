import API from '../.config/api.conf'
import ppts from './controllers/ppts'
import path from 'path'

export default function routes (app){
  let index = path.join(__dirname, '../client/index.html')

  if(process.env.NODE_ENV === 'production'){
    index =  path.join(__dirname, '../dist/index.html')
  }
  app.get('*',function(req, res){
    res.sendFile(index)
  })
  app.post(API.STORE_GENERAL, ppts.saveGeneral )
  app.post(API.STORE_SLIDE, ppts.saveSlide)
  app.delete(API.DELETE_GENERAL, ppts.deleteSlide)
  app.delete(API.DELETE_SLIDE, ppts.deleteGeneral)
}
