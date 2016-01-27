import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import Button from '../../client/components/Button'

describe('react component functionality', () => {
  let handlers = {
    click: (e) => {
      console.log('clicked')
    }
  }

  it('TestUtils', () => {
    expect(TestUtils).not.toBe(undefined)
    expect(TestUtils.renderIntoDocument).not.toBe(undefined)
    expect(TestUtils).not.toBe(null)
    expect(TestUtils.renderIntoDocument).not.toBe(null)
  })

  it('Disabled Button', () => {
    let btn = TestUtils.renderIntoDocument(
      <Button disabled={true} onClick={handlers.click}>Button to click</Button>
    )
    let btnNode = ReactDOM.findDOMNode(btn)
    expect(btnNode.textContent).toEqual('Button to click')

    let btnEl = TestUtils.findRenderedDOMComponentWithTag(
      btn, 'button'
    )

    expect(TestUtils.isDOMComponent(btnEl)).toBe(true)
    expect(btnEl.disabled).toBe(true)

    spyOn(handlers, 'click').and.callThrough()
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(
      btn, 'button'
    ))
    expect(handlers.click.calls.any()).toBe(false)
  })

  it('enabled button', () => {
    let btn = TestUtils.renderIntoDocument(
      <Button disabled={false} onClick={handlers.click}>Enabled Button</Button>
    )
    spyOn(handlers,'click').and.callThrough()
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(
      btn, 'button'
    ))
    expect(handlers.click.calls.any()).toBe(true)
  })
})
