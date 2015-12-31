import React from 'react'

let {
  Component,
  PropTypes
} = React

export default class Footer extends Component{
  render(){
    const {footer} = this.props
    return(
      <div style={styles.outer}>
        <footer style={styles.container}>
          <div style={styles.item}>
            {footer.company}
          </div>
          <div style={styles.item}>
            {footer.reversion}
          </div>
        </footer>
      </div>
    )
  }
}

const styles = {
  outer:{
    flex:1
  },
  container:{
    flexDirection:'column',
    height:30
  },
  item:{
    flex:1
  }
}

Footer.propTypes = {
  footer: PropTypes.shape({
    company: PropTypes.string.isRequired,
    reversion: PropTypes.string.isRequired
  }).isRequired
}
