import React from 'react'
import {marked} from '../utils/tools'

let{
  Component,
  PropTypes
} = React

export default class Content extends Component{
  constructor(props){
    super(props)
    this.getMarkup= this.getMarkup.bind(this)
  }
  getMarkup(){
    const {content} = this.props
    return {
      __html: marked(content)
    }
  }
  render(){
    return(
      <div style={styles.container} dangerouslySetInnerHTML={this.getMarkup()} />
    )
  }
}

const styles = {
  container:{
    marginLeft:80
  }
}

Content.propTypes = {
  content: PropTypes.string
}
