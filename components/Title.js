import React from 'react'

let{
  Component,
  PropTypes
} = React

export default class Title extends Component{
  render(){
    const {title} = this.props

    return (
      <div style={styles.title}>
        {title}
      </div>
    )
  }
}
const styles={
  title:{
    fontWeight: 600,
    color:'rgb(70, 13, 212)',
    textAlign: 'center'
  }
}
Title.propTypes = {
  title: PropTypes.string.isRequired
}
