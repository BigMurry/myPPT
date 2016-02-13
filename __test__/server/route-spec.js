import mongoose from 'mongoose'
import chai from 'chai'
import '../../server/models'

const {expect} = chai

describe('[route test]', function(){

  before(function(done){
    mongoose.connect('mongodb://localhost/ppt_test', {}, function(){
      done()
    })
  })

  describe('edit action', function(){
    
  })

  after(function(done){
    mongoose.connection.close(function(){
      done()
    })
  })
})
