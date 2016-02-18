import mongoose from 'mongoose'
import chai from 'chai'
import '../../server/models'

const {expect} = chai

describe('[slide model]', function(){
  const Slide
  before(function(done){
    mongoose.connect('mongodb://localhost/ppt_test',{}, function(){
      Slide = mongoose.model('Slide')
      done()
    })
  })
})
