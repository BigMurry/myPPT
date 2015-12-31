import React from 'react'
import NavItem from '../components/NavItem'

let{
  Component,
  PropTypes
} = React

export default class QuickNav extends Component{
  render(){
    const {slides, step, ...other} = this.props
    return (
      <div style={styles.outer}>
        <div style={styles.container}>
          {slides.map((slide, idx) =>
            <NavItem key={idx} slide={slide} active={idx===step} {...other}/>
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  outer:{
    flex:1
  },
  container:{
    flexDirection:'column'
  }
}

QuickNav.propTypes = {
  slides: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  step: PropTypes.number.isRequired
}
