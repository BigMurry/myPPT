import mongoose from 'mongoose'
import chai from 'chai'
import request from 'supertest'
import '../../server/models'
import {app} from '../../server'
import BPromise from 'bluebird'
import debug from 'debug'

const logger = debug('myapp')

const Slide = mongoose.model('Slide')
const User = mongoose.model('User')

const {expect} = chai

describe('[route test]', function(){
  let API

  before(function(done){
    API = {
      STORE_GENERAL:'/general/save',
      STORE_SLIDE:'/slide/save',
      DELETE_GENERAL:'general/del',
      DELETE_SLIDE:'/slide/del',
    }
    mongoose.connect('mongodb://localhost/ppt_test', {}, function(){
      done()
    })
  })

  after(function(done){
    mongoose.connection.close(function(){
      done()
    })
  })

  describe('get slide', function(){
    //it('should API.STORE_GENERAL => 200', function(done){
      //request(app)
      //  .post(API.STORE_GENERAL)
      //  .send({
      //    creator:'testor1',
      //    title:'ppt1',
      //  })
      //  .expect(200)
      //  .end(function(err, res){
      //    if(err) return done(err)
      //    done()
      //  })
    //})

    after(function(done){
      const s = Slide.remove({})
      const u = User.remove({})
      BPromise.all([s, u])
      .then(function(errs){
        done()
      })
    })


    let slide1, testor1
    it('should testor1 saved & has an id', function(done){
      testor1 = new User({
        name:'user1',
        username: 'testor1',
        password: 'pass',
        email: 'testor1@demo.com'
      })
      testor1.save()
      .then(function(t){
        expect(t).to.be.ok
        expect(t._id).to.be.ok
        done()
      })
    })

    it('should slide saved & has an id', function(done){
      slide1 = new Slide({
        creator: testor1._id,
        name: 'slide1',
        content:'slide1 content'
      })
      slide1.save()
      .then(function(s){
        expect(s).to.be.ok
        expect(s._id).to.be.ok
        done()
      })
    })

    it('send request should get the slide by id', function(done){
      request(app)
        .get(`/slide/get/${slide1._id}`)
        .expect(200)
        .end((err, res) => {
          if(err) done(err)
          expect(res).to.be.ok
          expect(res.body).to.be.ok
          expect(res.body.creator).to.be.equals(testor1._id.toString())
          expect(res.body.name).to.be.equal('slide1')
          //console.log(res)
          done()
        })
    })

    it('send request should search the slide by key', function(done){
      request(app)
        .post(`/slide/search`)
        .send({
          key:'slide1'
        })
        .expect(200)
        .end((err, res) => {
          expect(res).to.be.ok
          expect(res.body).to.have.length(1)
          expect(res.body[0].creator).to.be.equal(testor1._id.toString())
          expect(res.body[0].name).to.be.equal('slide1')
          done()
        })
    })
  })

})
