import React from 'react'
import Main from '../components/Main'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {connect} from 'react-redux'
import {fetchSlidesIfNeeded} from '../actions/slides'

let{
  Component
} = React

class App extends Component{
  constructor(props){
    super(props)
  }

  componentWillUpdate(){
    const {dispatch} = this.props
    dispatch(fetchSlidesIfNeeded())
  }

  componentWillMount(){
    const {dispatch} = this.props
    dispatch(fetchSlidesIfNeeded())
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

export default connect(mapStateToProps)(App)
