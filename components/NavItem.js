import React from 'react'
import {goto, closeNav} from '../actions/navigator'
import FaLocationArrow from 'react-icons/lib/fa/location-arrow'
import classnames from 'classnames'

let{
  Component,
  PropTypes
} = React

export default class NavItem extends Component{
  constructor(props){
    super(props)
    this._navTo = this._navTo.bind(this)
  }
  _navTo(){
    const {idx, dispatch} = this.props
    dispatch(goto(idx))
    dispatch(closeNav())
  }

  render(){
    const {slide, idx, step} = this.props
    return (
      <div
        className={classnames('nav-item', {'active': step===idx})}
        style={styles.item}
        onClick = {this._navTo}
      >
        <FaLocationArrow className={'icon'}/>
        {slide.title}
      </div>
    )
  }
}

const styles = {
  active:{

  },
  item:{
    borderRadius:10,
    marginBottom:15,
    cursor:'pointer',
    padding:10,
  }
}

NavItem.propTypes = {
  active: PropTypes.bool,
  slide: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  })
}
