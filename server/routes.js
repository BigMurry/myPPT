
export function(app){
  app.post('/general/save/:id', ppts.saveGeneral )
  app.post('/slide/save/:id', ppts.saveSlide)
  app.delete('/slide/del/:id', ppts.deleteSlide)
  app.delete('/general/del/:id', ppts.deleteGeneral)
}
