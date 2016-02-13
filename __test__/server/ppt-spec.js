import chai from 'chai'
import mongoose from 'mongoose'

//import the models for side effects only, without importing any bindings
import '../../server/models'

//mongoose.connect('mongodb://localhost/ppt_test')

let expect = chai.expect

describe('[mongodb available]', function(){
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

  describe('Schema api check', function(){

    let PPT

    beforeEach(function(done){
      PPT = mongoose.model('PPT')
      done()
    })

    describe('schema static apis', function(){

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

      it('should load ok', function(done){
        let ppt = new PPT({
          creator: 'testor01',
          title:'test title',
          subTitle:'test sub-title',
          slides:{
            head:'slide1',
            content:'content1',
            extras:{
              k1:'v1',
              k2:'v2',
              k3:'v3'
            }
          }
        })

        ppt.save(function(err){
          PPT.load({
            criteria: {creator: 'testor01'},
            select:'creator title subTitle modifiedOn createOn slides'
          }, function(err, ppt){
            expect(err).to.be.not.ok
            expect(ppt).to.be.ok
            expect(ppt.creator).to.be.equal('testor01')
            expect(ppt.title).to.be.equal('test title')
            expect(ppt.subTitle).to.be.equal('test sub-title')
            expect(ppt.createOn).to.be.ok
            expect(ppt.modifiedOn).to.be.ok
            expect(ppt.slides).to.be.ok
            expect(ppt.slides).to.have.length(1)
            expect(ppt.slides[0].head).to.be.equal('slide1')
            expect(ppt.slides[0].content).to.be.equal('content1')
            expect(ppt.slides[0].extras).to.deep.equal({
              k1:'v1',
              k2:'v2',
              k3:'v3'
            })
            expect(ppt.license).to.be.not.ok
            done()
          })
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

    describe('add slide', function(){
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

    describe('update a exsiting slide', function(){
      let ppt

      before(function(done){
        ppt = new PPT({
          creator:'creator3',
          title:'title3',
          subTitle:'sub-title3',
          slides:[
            {
              head:'slide1',
              content:'content1'
            }
          ]
        })

        let slideInfo = [{
          index:0,
          head:'slide-new',
          content:'content-new',
          extras:{
            key1:'value1',
            key2:'value2',
            key3:'value3'
          }
        }]
        ppt.updateSlide(slideInfo).then(function(){
          done()
        })
      })

      after(function(done){
        PPT.remove({}, function(){
          done()
        })
      })

      it('should update a slide', function(done){
        PPT.load({
          criteria:{creator:'creator3'},
          select:'creator slides title subTitle'
        }, function(err, p){
          expect(p).to.be.ok
          expect(p.slides).to.have.length(1)
          expect(p.slides[0].head).to.be.equal('slide-new')
          expect(p.slides[0].content).to.be.equal('content-new')
          expect(p.slides[0].extras).to.deep.equal({
            key1:'value1',
            key2:'value2',
            key3:'value3'
          })
          done()
        })
      })

    })

    describe('update a empty slide', function(){
      let ppt

      before(function(done){
        ppt = new PPT({
          creator:'creator4',
          title:'title3',
          subTitle:'sub-title3'
        })

        let slideInfo = [{
          index:1,
          head:'slide-new',
          content:'content-new',
          extras:{
            key1:'value1',
            key2:'value2',
            key3:'value3'
          }
        }]
        ppt.updateSlide(slideInfo).then(function(){
          done()
        })
      })

      after(function(done){
        PPT.remove({}, function(){
          done()
        })
      })

      it('should have one slide', function(done){
        PPT.load({
          criteria:{creator: 'creator4'},
          select:'creator title slides'
        },function(err, p){
          expect(p).to.be.ok
          expect(p.creator).to.be.equal('creator4')
          expect(p.slides).to.have.length(1)
          expect(p.get('slides.0.head')).to.be.equal('slide-new')
          expect(p.get('slides.0.content')).to.be.equal('content-new')
          expect(p.get('slides.0.extras')).to.deep.equal({
            key1:'value1',
            key2:'value2',
            key3:'value3'
          })
          done()
        })
      })


    })

    describe('search PPT', function(){
      //this.timeout(10000)
      before(function(done){
        let ppts = []
        ppts.push(new PPT({
          title:'ppt1',
          creator:'c1',
          keywords:'k1;l1;h1',
        }))
        ppts.push(new PPT({
          title:'ppt2',
          creator:'c2',
          keywords:'k1;l2;h2',
        }))
        ppts.push(new PPT({
          title:'ppt3',
          creator:'c1',
          keywords:'k2;l1;h2',
        }))
        ppts.push(new PPT({
          title:'ppt4',
          creator:'c2',
          keywords:'k2;l2;h1',
        }))
        ppts.push(new PPT({
          title:'ppt5',
          creator:'c2',
          keywords:'k2;l2;h2',
        }))
        ppts.push(new PPT({
          title:'ppt6',
          creator:'c3',
          keywords:'k3',
        }))
        ppts.push(new PPT({
          title:'ppt7',
          creator:'c3',
          keywords:'ppt8',
        }))
        ppts.push(new PPT({
          title:'ppt8',
          creator:'c3',
          keywords:'k4',
        }))
        ppts.push(new PPT({
          title:'ppt9ppt9',
          creator:'c4',
          keywords:'k5k5',
        }))
        ppts.push(new PPT({
          title:'ppt9-ppt9',
          creator:'c4',
          keywords:'k5k5;k5',
        }))
        ppts.push(new PPT({
          title:'ppt9ppt9',
          creator:'c4',
          keywords:'k5-k5',
        }))
        ppts.push(new PPT({
          title:'ppt10',
          creator:'c4',
          keywords:'k6;kk6',
          stars:1,
        }))
        ppts.push(new PPT({
          title:'ppt11',
          creator:'c4',
          keywords:'k7;kk6',
          stars:1,
        }))
        ppts.push(new PPT({
          title:'ppt12',
          creator:'c4',
          keywords:'k8;kk6',
          stars:2,
        }))
        let total = ppts.length
        function saveAll(){
          let doc = ppts.shift()
          doc.save(function(err, d){
            if(err) throw err
            if(--total) saveAll()
            else done()
          })
        }

        saveAll()
      })

      after(function(done){
        PPT.remove({}, function(err){
          done()
        })
      })

      it('should search by title ok', function(done){
        PPT.search({
          key:'ppt1',
          select:'title creator keywords createOn'
        }, function(err, results){
          expect(err).to.be.not.ok
          expect(results).to.have.length(1)
          expect(results[0].get('title')).to.be.equal('ppt1')
          expect(results[0].get('creator')).to.be.equal('c1')
          expect(results[0].get('keywords')).to.be.equal('k1;l1;h1')
          done()
        })
      })

      it('should search by key ok, when there only one key', function(done){
        PPT.search({
          key:'k3',
          select:'title creator keywords createOn'
        }, function(err, results){
          expect(err).to.be.not.ok
          expect(results).to.have.length(1)
          expect(results[0].get('title')).to.be.equal('ppt6')
          expect(results[0].get('creator')).to.be.equal('c3')
          expect(results[0].get('keywords')).to.be.equal('k3')
          done()
        })
      })

      it('should search by key ok, when multi-keys exist', function(done){
        PPT.search({
          key:'k1',
          select:'title creator keywords createOn'
        }, function(err, results){
          expect(err).to.be.not.ok
          expect(results).to.have.length(2)
          expect(results[1].get('title')).to.be.equal('ppt1')
          expect(results[1].get('creator')).to.be.equal('c1')
          expect(results[1].get('keywords')).to.be.equal('k1;l1;h1')
          expect(results[0].get('title')).to.be.equal('ppt2')
          expect(results[0].get('creator')).to.be.equal('c2')
          expect(results[0].get('keywords')).to.be.equal('k1;l2;h2')
          done()
        })
      })

      it('should search title split by word, NOT split in the middle of a word', function(done){
        PPT.search({
          key:'ppt9',
          select:'title creator keywords createOn'
        }, function(err, results){
          expect(err).to.be.not.ok
          expect(results).to.have.length(1)
          expect(results[0].get('title')).to.be.equal('ppt9-ppt9')
          expect(results[0].get('creator')).to.be.equal('c4')
          expect(results[0].get('keywords')).to.be.equal('k5k5;k5')
          done()
        })
      })

      it('should search keywords split by word, NOT split in the middle of a word', function(done){
        PPT.search({
          key:'k5',
          select:'title creator keywords createOn'
        }, function(err, results){
          expect(err).to.be.not.ok
          expect(results).to.have.length(2)
          expect(results[1].get('title')).to.be.equal('ppt9-ppt9')
          expect(results[1].get('creator')).to.be.equal('c4')
          expect(results[1].get('keywords')).to.be.equal('k5k5;k5')
          expect(results[0].get('title')).to.be.equal('ppt9ppt9')
          expect(results[0].get('creator')).to.be.equal('c4')
          expect(results[0].get('keywords')).to.be.equal('k5-k5')
          done()
        })
      })

      it('should sort by stars-descending first then createOn-ascending', function(done){
        PPT.search({
          key:'kk6',
          select:'title creator keywords createOn'
        }, function(err, results){
          expect(err).to.be.not.ok
          expect(results).to.have.length(3)
          expect(results[0].get('title')).to.be.equal('ppt12')
          expect(results[1].get('title')).to.be.equal('ppt11')
          expect(results[2].get('title')).to.be.equal('ppt10')
          done()
        })
      })

    })

    describe('find PPT', function(){
      this.timeout(1000)
      before(function(done){
        let ppts = []
        ppts.push(new PPT({
          title:'ppt1',
          creator:'c1',
          keywords:'k1;',
          stars:1,
          status:1
        }))
        ppts.push(new PPT({
          title:'ppt2',
          creator:'c1',
          keywords:'k2;',
          stars:1,
          status:2,
        }))
        ppts.push(new PPT({
          title:'ppt3',
          creator:'c1',
          keywords:'k3;',
          stars:2,
          status:2,
        }))
        ppts.push(new PPT({
          title:'ppt4',
          creator:'c1',
          keywords:'k4;',
          stars:3,
          status:3,
        }))
        ppts.push(new PPT({
          title:'ppt5',
          creator:'c2',
          keywords:'k5;',
          stars:4,
          status:4,
        }))
        let total = ppts.length
        function saveAll(){
          let doc = ppts.shift()
          doc.save(function(err, d){
            if(err) throw err
            setTimeout(function(){
              if(--total) saveAll()
              else done()
            }, 100)

          })
        }
        saveAll()
      })

      after(function(done){
        PPT.remove({}, function(err){
          done()
        })
      })

      it('should find all ppts by one creator', function(done){
        PPT.findByUser({
          user:'c1',
          select:'title creator createOn stars keywords'
        }, function(err, results){
          expect(results).to.have.length(4)
          done()
        })
      })

      it('should sort default by: stars, create date, status', function(done){
        PPT.findByUser({
          user:'c1',
          select:'title creator createOn stars keywords modifiedOn'
        }, function(err, results){
          expect(results).to.have.length(4)
          expect(results[0].get('title')).to.be.equal('ppt4')
          expect(results[1].get('title')).to.be.equal('ppt3')
          expect(results[2].get('title')).to.be.equal('ppt2')
          expect(results[3].get('title')).to.be.equal('ppt1')
          done()
        })
      })

      it('should sort by create date', function(done){
        PPT.findByUser({
          user:'c1',
          order:{'createOn':-1},
          select:'title creator createOn stars keywords'
        }, function(err, results){
          expect(results).to.have.length(4)
          expect(results[0].get('title')).to.be.equal('ppt4')
          expect(results[1].get('title')).to.be.equal('ppt3')
          expect(results[2].get('title')).to.be.equal('ppt2')
          expect(results[3].get('title')).to.be.equal('ppt1')
          done()
        })
      })

      it('should can sort by status', function(done){
        PPT.findByUser({
          user:'c1',
          order:{'status':1},
          select:'title creator createOn stars keywords'
        }, function(err, results){
          expect(results).to.have.length(4)
          expect(results[0].get('title')).to.be.equal('ppt1')
          expect(results[1].get('title')).to.be.equal('ppt3')
          expect(results[2].get('title')).to.be.equal('ppt2')
          expect(results[3].get('title')).to.be.equal('ppt4')
          done()
        })
      })

    })

  })


})
