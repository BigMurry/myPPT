import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Button from '../../client/components/Button'

describe('react component', function(){

  describe('Environment availble', function(){
    it('TestUtils available', function (){
      expect(TestUtils).to.be.ok
      expect(TestUtils.renderIntoDocument).to.be.ok
    })

    it('`chai` available', function(){
      expect(chai).to.be.ok
      expect(chai).to.be.ok
    })

    it('sinon available', function(){
      expect(sinon).to.be.ok
    })
  })


  describe('Button `onClick` handler check', function(){
    let onClickHandler;

    beforeEach(function(){
      onClickHandler = sinon.spy()
    })

    it('Button children', () => {
      let btn = TestUtils.renderIntoDocument(
        <Button>Button to click</Button>
      )
      let btnNode = ReactDOM.findDOMNode(btn)
      expect(btnNode.textContent).to.equal('Button to click')
    })

    it('Disabled Button', () => {
      let btn = TestUtils.renderIntoDocument(
        <Button disabled={true}>A Button</Button>
      )
      let btnNode = TestUtils.findRenderedDOMComponentWithTag(
        btn, 'button'
      )
      expect(btnNode.disabled).to.be.ok

      TestUtils.Simulate.click(btnNode)
      expect(onClickHandler.called).to.not.be.ok
    })

    it('Enabled Button', () => {
      let btn = TestUtils.renderIntoDocument(
        <Button disabled={false} onClick={onClickHandler}>Enabled Button</Button>
      )
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(
        btn, 'button'
      ))
      expect(onClickHandler.called).to.be.ok
    })
  })
})
