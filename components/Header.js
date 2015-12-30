import React from 'react'


let{
  Component,
  PropTypes
} = React

export default class Header extends Component{
  render(){
    const {header} = this.props
    return (
      <div style={styles.outer}>
        <header style={styles.container}>
          <div style={styles.item}>
            {header.title}
          </div>
          <div style={styles.item}>
            {header.subtitle}
          </div>
        </header>
      </div>
    )
  }
}

const styles = {
  outer:{
    flex:1,
    flexDirection:'row'
  },
  container:{
    flexDirection:'column',
    height:30
  },
  item:{
    flex:1
  }
}
