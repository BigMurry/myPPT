import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Button from '../../client/components/Button'

describe('react component', () => {

  describe('Environment availble', () => {
    it('TestUtils available', () => {
      expect(TestUtils).not.toBe(undefined)
      expect(TestUtils.renderIntoDocument).not.toBe(undefined)
      expect(TestUtils).not.toBe(null)
      expect(TestUtils.renderIntoDocument).not.toBe(null)
    })

    it('`jasmine` available', () => {
      expect(jasmine).toBeTruthy()
      expect(jasmine.createSpy).toBeTruthy()
    })
  })


  describe('Button `onClick` handler check', () => {
    let onClickHandler;

    beforeEach(() => {
      onClickHandler = jasmine.createSpy('onClickHandler')
    })

    it('Button children', () => {
      let btn = TestUtils.renderIntoDocument(
        <Button>Button to click</Button>
      )
      let btnNode = ReactDOM.findDOMNode(btn)
      expect(btnNode.textContent).toEqual('Button to click')
    })

    it('Disabled Button', () => {
      let btn = TestUtils.renderIntoDocument(
        <Button disabled={true}>A Button</Button>
      )
      let btnNode = TestUtils.findRenderedDOMComponentWithTag(
        btn, 'button'
      )
      expect(btnNode.disabled).toBe(true)

      TestUtils.Simulate.click(btnNode)
      expect(onClickHandler.calls.any()).toBe(false)
    })

    it('Enabled Button', () => {
      let btn = TestUtils.renderIntoDocument(
        <Button disabled={false} onClick={onClickHandler}>Enabled Button</Button>
      )
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(
        btn, 'button'
      ))
      expect(onClickHandler.calls.any()).toBe(true)
    })
  })
})
