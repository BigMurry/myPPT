
export function(app){
  app.post('/general/save', ppts.saveGeneral )
  app.post('/slide/save', ppts.saveSlide)
  app.delete('/slide/del', ppts.deleteSlide)
  app.delete('/general/del', ppts.deleteGeneral)
}
