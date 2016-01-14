import React from 'react'
import {Router} from 'react-router'

let {
  Component,
  PropTypes
} = React

export default class App extends Component{
  render(){
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired
}
