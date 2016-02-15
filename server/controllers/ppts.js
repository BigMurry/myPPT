'use strict'

import wrap from 'co-express'
import mongoose from 'mongoose'

const PPT = mongoose.model('PPT')

export default {
  saveGeneral: wrap(function* (req, res, next){
    const ppt = new PPT(req.body)
    yield ppt.save()
    res.send('hello')
  }),
  saveSlide: wrap(function* (req, res, next){
    const ppt = new PPT(req.body)
    yield ppt.save()
    res.send('hello')
  }),
  deleteGeneral(){},
  deleteSlide(){}
}
