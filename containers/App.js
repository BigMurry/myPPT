import React from 'react'
import Main from '../Components/Main'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {connect} from 'react-redux'
import {fetchSlidesIfNeeded} from '../actions/navigator'

let{
  Component
} = React

class App extends Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    const {dispatch, slides} = this.props
    dispatch(fetchSlidesIfNeeded(slides))
  }

  render(){
    const {header, footer, author, slides, step, dispatch} = this.props
    return (
      <div className="container">
        <Header header={header}/>
        <Main slides={slides} author={author} step={step} dispatch={dispatch}/>
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
    step: state.navigator.currentStep
  }
}

export default connect(mapStateToProps)(App)
