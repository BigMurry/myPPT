import React from 'react'
import Title from '../components/Title'
import Content from '../components/Content'
import Button from '../components/Button'
import classnames from 'classnames'

import {forward, backward} from '../actions/navigator'
import {setup} from '../actions/progress'

let {
  Component,
  PropTypes
} = React

export default class Main extends Component{
  constructor(props){
    super(props)
    this._renderSlide = this._renderSlide.bind(this)
    //this._handlePre = this._handlePre.bind(this)
    //this._handleNext = this._handleNext.bind(this)
  }

  componentWillUpdate(props, state){
    const {dispatch} = this.props
    dispatch(setup())
  }

  _handlePre(){
    const{dispatch, progress} = this.props
    if(!progress.begin){
      dispatch(backward())
    }
  }

  _handleNext(){
    const{dispatch, progress} = this.props
    if(!progress.end){
      dispatch(forward())
    }
  }

  _renderSlide(){
    const{step, slides, header, author} = this.props
    if(step===0){
      return (
        <div style={styles.frontContainer}>
          <div style={styles.headerTitle}>
            {header.title}
          </div>
          <div style={styles.subTitle}>
            {header.subtitle}
          </div>
          <div style={styles.author}>
            <p>{author.name}</p>
            <p>{author.email}</p>
          </div>
        </div>
      )
    }else{
      let slide = slides[step-1] ? slides[step-1] : {title:'input title', content:'input content'}
      return (
        <div style={styles.container}>
          <Title title={slide.title} />
          <Content content={slide.content} />
        </div>
      )
    }
  }
  render(){
    const {progress}=this.props
    return (
      <div style={styles.outer}>
        {this._renderSlide()}
        <div style={styles.actions}>
          <button
            className={classnames('btn',{disabled: progress.begin})}
            style={styles.button}
            disabled={progress.begin}
            onClick={this._handlePre.bind(this)}
          >prev</button>
          <button
            className={classnames('btn', {disabled: progress.end})}
            style={styles.button}
            disabled={progress.end}
            onClick={this._handleNext.bind(this)}
          >next</button>
        </div>
      </div>
    )
  }
}

const styles = {
  outer:{
    height: 500,
    backgroundColor:'rgb(0, 0, 0)',
    color:'rgb(254, 161, 4)',
    position:'relative'
  },
  button:{
    borderRadius: 20,
    border:0,
    marginRight:15,
    fontSize:25,
    backgroundColor:'rgb(33, 236, 8)',
    cursor:'pointer',
  },
  actions:{
    position:'absolute',
    bottom:0,
    margin:'10'
  },
  frontContainer:{
    paddingTop:20,
    textAlign:'center'
  },
  headerTitle:{
    fontSize:30
  },
  subTitle:{
    marginTop:10,
    color:'rgb(215, 211, 149)'
  },
  author:{
    marginTop:50,
    color:'rgb(46, 37, 62)'
  },
}

Main.propTypes = {
  author: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  slides: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
}
