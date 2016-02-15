import mongoose from 'mongoose'
import chai from 'chai'
import request from 'supertest'
import '../../server/models'
import {app} from '../../server'

const {expect} = chai

describe('[route test]', function(){
  let API
  before(function(){
    API = {
      STORE_GENERAL:'/general/save',
      STORE_SLIDE:'/slide/save',
      DELETE_GENERAL:'general/del',
      DELETE_SLIDE:'/slide/del',
    }
  })
  describe('route request only', function(){
    it('should API.STORE_GENERAL => 200', function(done){
      request(app)
        .post(API.STORE_GENERAL)
        .expect(200)
        .end(function(err, res){
          if(err) return done(err)
          done()
        })
    })

    it('should API.STORE_SLIDE => 200', function(done){
      request(app)
        .post(API.STORE_SLIDE)
        .expect(200)
        .end(function(err, res){
          if(err) return done(err)
          done()
        })
    })

    it('should call save slide info ok', function(){

    })
  })

  describe('route with db store', function(){
    before(function(done){
      mongoose.connect('mongodb://localhost/ppt_test', {}, function(){
        done()
      })
    })

    after(function(done){
      mongoose.connection.close(function(){
        done()
      })
    })

    it('should save the general info in DB', function(){

    })

    it('should save the slide info in the DB', function(){

    })
  })


})
