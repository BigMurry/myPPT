import React from 'react'
import {Router} from 'react-router'

let {
  Component
} = React

export default class App extends Component{

  render(){
    const {routes, history} = this.props
    return (
      <Router>
      </Router>
    )
  }
}
