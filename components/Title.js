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
    fontSize:'2em',
    color:'rgb(143, 208, 153)',
    padding:'20 0 20 10',
    borderBottom:'1px rgb(159, 200, 214) solid'
  }
}
Title.propTypes = {
  title: PropTypes.string.isRequired
}
