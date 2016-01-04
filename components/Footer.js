import React from 'react'

let {
  Component,
  PropTypes
} = React

export default class Footer extends Component{
  render(){
    const {footer} = this.props
    return(
      <footer style={styles.container}>
        <div style={styles.item}>
          {footer.company}
        </div>
        <div style={styles.item}>
          {footer.revision}
        </div>
      </footer>
    )
  }
}

const styles = {
  container:{
    flexDirection:'column',
    backgroundColor:'rgb(91, 163, 230)',
    borderRadius:'0 0 5px 5px',
    textAlign: 'right'
  },
  item:{
    display: 'inline-block',
    marginLeft:50
  }
}

Footer.propTypes = {
  footer: PropTypes.shape({
    company: PropTypes.string,
    reversion: PropTypes.string
  }).isRequired
}
