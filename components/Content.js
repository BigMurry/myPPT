import React from 'react'
import marked from '../utils/tools'

let{
  Component,
  PropTypes
} = React

export default class Content extends Component{
  constructor(props){
    super(props)
    this.renderContent = this.renderContent.bind(this)
  }
  renderContent(slideContent){
    return marked(slideContent)
  }
  render(){
    const {slideContent} = this.props

    return(
      <div style={styles.outer}>
        <div style={styles.container}>
          {this.renderContent(slideContent)}
        </div>
      </div>
    )
  }
}

const styles = {
  outer:{
    flex:1,
    flexDirection: 'column'
  },
  container:{
    flex:1,
    backgroundColor:'rgb(0, 0, 0)',
    fontColor:'rgb(250, 195, 0)'
  }
}

Content.propTypes = {
  slideContent: PropTypes.string.isRequired
}
