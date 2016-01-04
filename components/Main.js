import React from 'react'
import Title from '../components/Title'
import Content from '../components/Content'

let {
  Component,
  PropTypes
} = React

export default class Main extends Component{
  constructor(props){
    super(props)
    this._renderSlide = this._renderSlide.bind(this)
  }
  _renderSlide(){
    const{step, slides, header, author} = this.props
    if(step===0){
      return (
        <div style={styles.container}>
          <div style={styles.headerTitle}>
            {header.title}
          </div>
          <p>Good</p>
          <div style={styles.subTitle}>
            {header.subtitle}
          </div>
          <div style={styles.author}>
            {author.name + '--' + author.email}
          </div>
        </div>
      )
    }else{
      let slide = slides[step] ? slides[step] : {title:'input title', content:'input content'}
      return (
        <div style={styles.container}>
          <Title title={slide.title} />
          <Content content={slide.content} />
        </div>
      )
    }
  }
  render(){
    return (
      <div style={styles.outer}>
        {this._renderSlide()}
      </div>
    )
  }
}

const styles = {
  outer:{

  },
  headerTitle:{

  },
  subTitle:{

  },
  author:{

  },
  container:{

  }
}

Main.propTypes = {
  author: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  slides: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
}
