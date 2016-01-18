import React from 'react'
import TiZoom from 'react-icons/lib/ti/zoom'
import Button from '../components/Button'

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
    placeHolder: 'Search to find the available ppt',
    style:{},
    className:'search-box'
  }

  render(){
    let {submitAction, placeHolder, style, className} = this.props
    return (
      <form className={className} style={style} onSubmit={submitAction}>
        <input placeholder={placeHolder} name='key'/>
        <Button type={'submit'}>
          {/* NOTE: add icon here */}
          <TiZoom className={'icon'} />
          {'Search'}
        </Button>
      </form>
    )
  }
}
