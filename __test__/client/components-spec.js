import TestUtils from 'react-addons-test-utils'

import Button from '../../client/components/Button'

describe('react component functionality', function(){
  it('my first test', function(){
    let a = 3
    expect(a).toEqual(3)
  })

  it('test toBe', function(){
    let a = 3
    console.log('test runing...')
    expect(a).toBe(3)
  })
})
