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
    disabled: false
  }

  render(){
    const {children, onClick, disabled, type} = this.props
    return(
      <button
        className={classnames('btn', {'disabled': disabled})}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired
}
