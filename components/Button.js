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
    const {children, onClick, disabled} = this.props
    return(
      <button className={classnames('btn', {'disabled': disabled})} disabled={disabled} onClick={onClick}>{children}</button>
    )
  }
}

const styles = {
  button:{
    borderRadius: 20,
    border:0,
    marginRight:15,
    fontSize:25,
    backgroundColor:'rgb(33, 236, 8)',
    cursor:'pointer'
  }
}

Button.propTypes = {
  onClick: PropTypes.func
}
