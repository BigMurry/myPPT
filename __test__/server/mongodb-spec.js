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

    after(function(done){
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

    it('should load ok', function(done){
      let ppt = new PPT({
        creator: 'testor',
        title:'test title',
        subTitle:'test sub-title'
      })

      ppt.save(function(err){
        PPT.load({
          criteria: {creator: 'testor'},
          select:'creator title subTitle modifiedOn createOn'
        }, function(err, ppt){
          expect(err).to.be.not.ok
          expect(ppt).to.be.ok
          expect(ppt.creator).to.be.equal('testor')
          expect(ppt.title).to.be.equal('test title')
          expect(ppt.subTitle).to.be.equal('test sub-title')
          expect(ppt.createOn).to.be.ok
          expect(ppt.modifiedOn).to.be.ok
          expect(ppt.license).to.be.not.ok
          done()
        })
      })
    })

    describe('should general info save ok', function(){

      let ppt

      before(function(done){
        ppt = new PPT({
          creator: 'testor1',
          title:'title1',
          subTitle:'sub-title1',
        })
        ppt.save(function(err){
          done()
        })
      })

      after(function(done){
        PPT.remove({}, function(){
          done()
        })
      })

      beforeEach(function(done){
        let generalInfo= {
            creator:'testor2',
            title:'title2'
          }
          ppt.updateGeneralInfo(generalInfo).then(function(err){
            done()
          })
      })

      it('ppt should changed', function(){
        expect(ppt).to.be.ok
        expect(ppt.creator).to.be.equal('testor2')
        expect(ppt.title).to.be.equal('title2')
      })

      it('should general info with testor1 not exist', function(done){
          PPT.load({
            criteria:{creator:'testor1'}
          }, function(err, p){
            expect(p).to.be.not.ok
            done()
          })
      })

      it('should general info with testor2 exist', function(done){
        PPT.load({
          criteria: {creator: 'testor2'}
        }, function(err, p){
          expect(p).to.be.ok
          expect(p.creator).to.be.equal('testor2')
          done()
        })
      })
    })

    describe('should slide info save ok', function(){

      let ppt

      before(function(done){
        ppt = new PPT({
          creator:'creator3',
          title:'title3',
          subTitle:'sub-title3'
        })

        let slide = {
          head:'slide1',
          content:'content1'
        }

        ppt.addSlide(slide).then(function(){
          done()
        })

      })

      after(function(done){
        PPT.remove({}, function(){
          done()
        })
      })

      it('should have a slide', function(done){
        PPT.load({
          criteria:{creator: 'creator3'},
          select:'creator slides title subTitle'
        }, function(err, p){
          expect(p).to.be.ok
          expect(p.slides).to.have.length(1)
          expect(p.slides[0].head).to.be.equal('slide1')
          expect(p.slides[0].content).to.be.equal('content1')
          done()
        })
      })

    })

  })

})
