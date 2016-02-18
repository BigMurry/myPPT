import chai from 'chai'
import '../../server/models'
import mongoose from 'mongoose'
import BPromise from 'bluebird'

const {expect} = chai

mongoose.Promise = BPromise

describe('[slide model]', function(){
  let Slide, User
  before(function(done){
    mongoose.connect('mongodb://localhost/ppt_test',{}, function(){
      Slide = mongoose.model('Slide')
      User = mongoose.model('User')
      done()
    })
  })

  after(function(done){
    mongoose.connection.close(() => {
      done()
    })
  })

  describe('methods', function(){
    let slide, slide2, user, user2

    before(function(done){
      done()
    })

    after(function(done){
      const u = User.remove({})
      const s = Slide.remove({})
      Promise.all([u, s]).then(function(errs){
        done()
      })
    })

    it('should user have an _id', function(done){
      user = new User({
        name:'testor1',
        username:'user1',
        email:'user1@demo.org',
        password:'pass',
      })
      user.save()
        .then(function(u){
          expect(u).to.be.ok
          expect(u._id).to.be.ok
          done()
        })
    })

    it('should slide have an _id', function(done){
      slide = new Slide({
          creator: user._id,
          name:'slide1',
          version:'0.0.1',
          keywords:'key1;key2;key3',
          modifiedOn:Date.now(),
          content:'slide content',
        })
        slide.save(function(err, s){
          expect(s).to.be.ok
          expect(s._id).to.be.ok
          done()
        })
    })

    it('should find one slide', function(done){
      Slide.find({name:'slide1'})
           .exec(function(err, r){
            expect(r).to.have.length(1)
            done()
          })
    })

    it('should have one stars', function(done){
      slide.starify(user._id)
        .then(function(slide){
          expect(slide.stars).to.have.length(1)
          expect(slide.stars[0].user).to.be.equal(user._id)
          expect(slide.stars[0].at).to.be.ok
          expect(slide.canStar(user._id)).to.be.not.ok
          done()
        })
    })

    it('should user2 have _id', function(done){
      user2 = new User({
        name:'testor2',
        username:'user2',
        email:'testor2@demo.org',
        password:'pass',
      })
      user2.save()
        .then(function(u){
          expect(u).to.be.ok
          expect(u._id).to.be.ok
          done()
        })
    })

    it('should have another stars', function(done){
      slide.starify(user2._id)
        .then(function(s){
          expect(s.stars).to.be.have.length(2)
          done()
        })
    })

    it('should slide2 have _id', function(done){
      slide2 = new Slide({
        creator: user2._id,
        name:'slide2',
        version:'11.11.1111',
        content:'slide2 content',
      })
      slide2.save()
        .then(function(s){
          expect(s).to.be.ok
          expect(s._id).to.be.ok
          expect(s.creator).to.be.equal(user2._id)
          done()
        })
        .catch(function(e){
          throw new Error(e)
        })
    })

  })

  describe('statics', function(){})
})
