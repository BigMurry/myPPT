import chai from 'chai'
import mongoose from 'mongoose'
import '../../server/models'

const expect = chai.expect

//mongoose.connect('mongodb://localhost/ppt_test')

describe('user schema api', function(){

  let User
  before(function(done){
    User = mongoose.model('User')
    done()
  })

  after(function(done){
    User.remove({}, function(){
      done()
    })
  })

  describe('virtual field', function(){
    let user
    before(function(done){

      user = new User({
        name:'testor',
        username:'testor_nick',
        email:'testor@a.com',
        password:'pass'
      })
      user.save(function(){
        done()
      })
    })

    after(function(done){

      done()
    })

    it('should get the created user document', function(done){
      User.findOne({name:'testor'})
          .select('name username email password hashed_password')
          .exec(function(err, r){
            console.log(r)
            expect(r).to.be.ok
            expect(r.get('name')).to.be.equal('testor')
            expect(r.get('username')).to.be.equal('testor_nick')
            expect(r.get('email')).to.be.equal('testor@a.com')
            expect(r.get('hashed_password')).to.be.ok
            done()
          })
    })

    it('should get virtual password field', function(done){
      User.findOne({name:'testor'})
          .exec(function(err, r){
            console.log(r)
            expect(r.get('password')).to.be.equal('pass')
            done()
          })
    })

    it('should authenticate method works properly', function(done){
      User.findOne({name:'testor'})
          .exec(function(err, r){
            expect(r.authenticate('pass')).to.be.ok
            done()
          })
    })
  })
})
