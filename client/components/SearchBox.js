import React from 'react'
import TiZoom from 'react-icons/lib/ti/zoom'
import Button from '../components/Button'

let {
  Component,
  PropTypes
} = React

export default class SearchBox extends Component{

  static propTypes = {
    submitAction: PropTypes.string.isRequired,
    onSubmit:PropTypes.func,
    placeHolder: PropTypes.string.isRequired
  }

  static defaultProps = {
    placeHolder: 'Search the available ppt',
    style:{},
    className:'search-box'
  }

  render(){
    let {submitAction, onSubmit, placeHolder, style, className} = this.props
    return (
      <form className={className} style={style} action={submitAction} onSubmit={onSubmit}>
        <input style={styles.input} placeholder={placeHolder} name='key'/>
        <Button type={'submit'}>
          {/* NOTE: add icon here */}
          <TiZoom className={'icon'} />
          {'Search'}
        </Button>
      </form>
    )
  }
}

const styles = {
  input:{
    fontSize:30,
    marginRight:20,
    borderRadius:10
  }
}
