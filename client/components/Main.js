import React from 'react'
import Title from '../components/Title'
import Content from '../components/Content'
import Button from '../components/Button'
import QuickNav from '../components/QuickNav'
import classnames from 'classnames'
import FaBars from 'react-icons/lib/fa/bars'
import TiArrowLeftThick from 'react-icons/lib/ti/arrow-left-thick'
import TiArrowRightThick from 'react-icons/lib/ti/arrow-right-thick'
import Modal from 'react-modal'

import {navigator, progress} from '../actions/project'

let {
  Component,
  PropTypes
} = React

let {
  setup
} = progress

let {
  forward,
  backward,
  openNav,
  closeNav
} = navigator

export default class Main extends Component{
  constructor(props){
    super(props)
    this._renderSlide = this._renderSlide.bind(this)
    this._openQuickNav = this._openQuickNav.bind(this)
    this._closeQuickNav = this._closeQuickNav.bind(this)
    //this._handlePre = this._handlePre.bind(this)
    //this._handleNext = this._handleNext.bind(this)
  }

  _handlePre(){
    const{dispatch, progress} = this.props
    if(!progress.begin){
      dispatch(backward())
    }
  }

  _openQuickNav(){
    const {dispatch} = this.props
    dispatch(openNav())
  }
  _closeQuickNav(){
    const {dispatch} = this.props
    dispatch(closeNav())
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
    const {progress, navShow, slides, step, dispatch}=this.props
    return (
      <div style={styles.outer}>
        <Modal
          style={styles.modal}
          isOpen = {navShow}
          onRequestClose = {this._closeQuickNav}
        >
          <QuickNav slides={slides} step={step} dispatch={dispatch}/>
        </Modal>
        {this._renderSlide()}
        <div style={styles.actions}>
          <Button onClick={this._openQuickNav}>
            nav
            <FaBars className={'icon'}/>
          </Button>
          <button
            className={classnames('btn',{disabled: progress.begin})}
            disabled={progress.begin}
            onClick={this._handlePre.bind(this)}
          >prev<TiArrowLeftThick className={'icon'}/></button>
          <button
            className={classnames('btn', {disabled: progress.end})}
            disabled={progress.end}
            onClick={this._handleNext.bind(this)}
          >next<TiArrowRightThick className={'icon'}/></button>
        </div>
      </div>
    )
  }
}

const styles = {
  outer:{
    color:'rgb(254, 161, 4)',
    margin:'40px 0 0 0',
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
    bottom:30,
    left:20,
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
    color:'rgb(119, 104, 144)'
  },
  modal:{
    overlay:{
      backgroundColor:'transparent'
    },
    content:{
      top: '140px',
      left:'15px',
      right: '10%',
      bottom: '100px',
      marginRight: '60%',
      background:'rgba(88, 85, 73, 0.81)'
    }
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
