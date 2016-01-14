import React from 'react'
import NavItem from '../components/NavItem'

let{
  Component,
  PropTypes
} = React

export default class QuickNav extends Component{
  render(){
    const {slides, step} = this.props
    return (
      <div style={styles.container}>
        <NavItem idx={0} slide={{title:'Home', content:'Return to home.'}} {...this.props}/>
        {slides.map((slide, idx) =>
          <NavItem key={idx} idx={idx+1} slide={slide} {...this.props}/>
        )}
      </div>
    )
  }
}

const styles = {
  container:{
  }
}

QuickNav.propTypes = {
  slides: PropTypes.arrayOf({
    title: PropTypes.string,
    content: PropTypes.string
  }),
  step: PropTypes.number.isRequired
}
