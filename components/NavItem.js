import React from 'react'

let{
  Component,
  PropTypes
} = React

export default class NavItem extends Component{
  render(){
    const {active, slide} = this.props
    return (
      <div style={active ? styles.active:'', ...styles.item}>
        {slide.toString()}
      </div>
    )
  }
}

const styles = {
  active:{

  },
  item:{

  }
}
