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

  //app.post('/general/save', ppts.saveGeneral )
  //app.post('/slide/save', ppts.saveSlide)
  //app.delete('/slide/del', ppts.deleteSlide)
  //app.delete('/general/del', ppts.deleteGeneral)
}
