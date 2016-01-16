import React from 'react'
import {Link} from 'react-router'
import Dropzone from 'react-dropzone'
import SearchBox from '../components/SearchBox'

let {
  Component,
  PropTypes
} = React

export default class Index extends Component{

  constructor(props){
    super(props)

    this._onSearch = this._onSearch.bind(this)
    this._onDrop = this._onDrop.bind(this)
  }

  _onSearch(){

  }

  _onDrop(files){

  }

  render(){
    return (
      <div style={styles.container}>
        <SearchBox submitAction={this._onSearch}/>
        <div style={styles.funcArea}>
          <div style={styles.actionContainer}>
            <Link to={'edit'}>Create a PPT</Link>
          </div>
          <div style={styles.actionContainer}>
            <Link to={'project'}>Start a Project</Link>
          </div>
          <div style={styles.uploadArea}>
            <Dropzone onDrop={this._onDrop}>
              <div>Drop your files here, or click to select files to upload</div>
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container:{},
  actionContainer:{},
  uploadArea:{}
}
