import React from 'react'
import Main from '../components/Main'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {connect} from 'react-redux'
import {fetchSlidesIfNeeded} from '../actions/slides'
import {forward, backward, openNav, closeNav} from '../actions/navigator'

let{
  Component
} = React

class Project extends Component{
  constructor(props){
    super(props)
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  _handleKeyDown(e){
    const {dispatch, progress, navShow} = this.props
    switch(e.keyCode){
      case 72://H
      case 37://arrow left
        if(!progress.begin){
          dispatch(backward())
        }
        break;
      case 76://L
      case 39://arrow right
      case 32://space
        if(!progress.end){
          dispatch(forward())
        }
        break;
      case 77://M
        if(!navShow){
          dispatch(openNav())
        }else{
          dispatch(closeNav())
        }
      break;
    }
  }

  componentWillUpdate(){
    const {dispatch} = this.props
    dispatch(fetchSlidesIfNeeded())
  }

  componentWillMount(){
    const {dispatch} = this.props
    dispatch(fetchSlidesIfNeeded())
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this._handleKeyDown, false);
  }

  render(){
    const {header, footer} = this.props
    return (
      <div className="container">
        <Header header={header}/>
        <Main {...this.props} />
        <Footer footer={footer} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    slides: state.slides.slides,
    header: state.slides.header,
    footer: state.slides.footer,
    author: state.slides.author,
    step: state.navigator.currentStep,
    navShow: state.navigator.navShow,
    progress: state.progress
  }
}

export default connect(mapStateToProps)(Project)
