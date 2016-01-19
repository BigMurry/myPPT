import React from 'react'
import classnames from 'classnames'

let{
  Component,
  PropTypes
} = React

export default class Button extends Component{
  constructor(props){
    super(props)
  }

  static defaultProps = {
    type: 'button',
    disabled: false,
  }

  render(){
    const {children, onClick, disabled, type, style, className} = this.props
    return(
      <button
        className={classnames('btn', {'disabled': disabled}, className)}
        disabled={disabled}
        onClick={onClick}
        type={type}
        style={style}
      >
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any.isRequired
}
