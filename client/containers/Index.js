import React from 'react'
import {Link} from 'react-router'

let {
  Component,
  PropTypes
} = React

export default class Index extends Component{
  render(){
    return (
      <div style={styles.container}>
        <SearchBox />
        <div style={styles.funcArea}>
          <div style={styles.actionContainer}>
            <Link path={'edit'}>Create a PPT</Link>
          </div>
          <div style={styles.actionContainer}>
            <Link path={'project'}>Start a Project</Link>
          </div>
          <div style={styles.uploadArea}>
            <input type={'file'}/>
          </div>
        </div>
      </div>
    )
  }
}
