import wrap from 'co-express'
import mongoose from 'mongoose'
import BPromise from 'bluebird'

mongoose.Promise = BPromise

const Slide = mongoose.model('Slide')
export default {

  load: wrap(function* (req, res, next, id){
    req.slide = yield Slide.load(id)
    if(!req.slide) next(new Error('can not find the corresponding slide'))
    next()
  }),

  search: wrap(function* (req, res, next){
    if(!req.body.key){
      res.json({error: false, msg: 'search key empty'})
    }
    const slides = yield Slide.search({
      key: req.body.key
    });
    res.json(slides)
  }),

  loadSlide: wrap(function* (req, res){
    res.json(req.slide)
  }),

  saveSlide: wrap(function* (req, res){

  }),

  deleteSlide: wrap(function* (req, res){

  })

}
