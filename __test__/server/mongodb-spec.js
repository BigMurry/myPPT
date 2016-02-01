import chai from 'chai'
import mongoose from 'mongoose'

//import the models for side effects only, without importing any bindings
import '../../server/models'

mongoose.connect('mongodb://localhost/ppt_test')

let expect = chai.expect

describe('[mongodb available]', function(){


  describe('[insert]', function(){

    let PPT

    beforeEach(function(done){
      PPT = mongoose.model('PPT')
      done()
    })

    afterEach(function(done){
      PPT.remove({}, function(){
        done()
      })
    })

    it('should insert a PPT', function(done){
      let ppt = new PPT({
        creator:'testor',
        title:'test title',
        subTitle:'test sub-title',
      })
      ppt.save(function(err){
        if(err){
          console.log(err.toString())
          throw new Error(err)
        }

        PPT.findOne({creator: 'testor'}, function(err, ppt){
          expect(ppt).to.be.ok
          expect(ppt.creator).to.be.equal('testor')
          expect(ppt.title).to.be.equal('test title')
          expect(ppt.subTitle).to.be.equal('test sub-title')
          done()
        })

      })
    })
  })

})
