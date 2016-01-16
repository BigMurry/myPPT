import React from 'react'
import TiZoom from 'react-icons/lib/ti/zoom'

let {
  Component,
  PropTypes
} = React

export default class SearchBox extends Component{

  static propTypes = {
    submitAction: PropTypes.func.isRequired,
    placeHolder: PropTypes.string.isRequired
  }

  static defaultProps = {
    placeHolder: 'Search to find the available ppt'
  }

  render(){
    let {submitAction, placeHolder} = this.props
    return (
      <form onSubmit={submitAction}>
        <input placeHolder={placeHolder} name='key' value={''}/>
        <Button type={'submit'}>
          {/* NOTE: add icon here */}
          <TiZoom className={'icon'} />
          {'Search'}
        </Button>
      </form>
    )
  }
}
