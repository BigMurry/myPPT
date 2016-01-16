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

  render(){
    const {children, onClick, disabled, ...rest} = this.props
    return(
      <button
        className={classnames('btn', {'disabled': disabled})}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func
}
