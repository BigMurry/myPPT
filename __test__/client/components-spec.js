import React from 'react'
import TU from 'react-addons-test-utils'

import Button from '../../client/components/Button'

describe('react component functionality', function(){
  it('Button', function(){
    let btn = TU.renderIntoDocument(
      <Button>Button</Button>
    )
    let nodes = TU.scryRenderedDOMComponentsWithTag(
      btn, 'button'
    )

    expect(nodes.length).toEqual(1)
  })
})
