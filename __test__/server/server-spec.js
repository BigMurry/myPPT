import chai from 'chai'

let expect = chai.expect

describe('server test', function(){

  describe('setup testor', function(){

    beforeEach(function(){
    })

    it('chai ok', function(){
      let a = 3
      let b = 4
      expect(a).to.be.equal(3)
      expect(b).to.be.equal(4)
    })

    it('show fail', function(){
      let a = 1
      expect(a).to.be.equal(2)
    })
  })

})
