import wrap from 'co-express'
import mongoose from 'mongoose'
import BPromise from 'bluebird'

mongoose.Promise = BPromise

const Slide = mongoose.model('Slide')
export default {
  load: wrap(function* (req, res, next, id){
    const slide = yield Slide.load(id)
    res.send(slide)
  }),
}
