import React from 'react'
let{
  Component,
  PropTypes
} = React

export default class Header extends Component{
  render(){
    const {header} = this.props
    return (
      <header style={styles.container}>
        <div style={Object.assign({}, styles.itemTitle, styles.item)}>
          {header.title}
        </div>
        <div style={Object.assign({}, styles.itemSubTitle, styles.item)}>
          {header.subtitle}
        </div>
      </header>
    )
  }
}

const styles = {
  container:{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor:'rgb(196, 181, 184)',
  },
  item:{
    marginLeft:20
  },
  itemTitle:{
    fontSize: 20,
    fontWeight:600,
  },
  itemSubTitle:{
  }
}

Header.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string
  }).isRequired
}
