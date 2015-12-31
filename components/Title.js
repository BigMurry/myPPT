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
    fontColor:'rgb(44, 250, 10)'
  }
}
Title.propTypes = {
  title: PropTypes.string.isRequired
}
