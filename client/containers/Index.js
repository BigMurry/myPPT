import React from 'react'
import {Link} from 'react-router'
import Dropzone from 'react-dropzone'
import SearchBox from '../components/SearchBox'
import TiEdit from 'react-icons/lib/ti/edit'
import TiDeviceDesktop from 'react-icons/lib/ti/device-desktop'
import TiUpload from 'react-icons/lib/ti/upload'

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
        <SearchBox style={styles.searchBox}  submitAction={'/search'} onSubmit={this._onSearch}/>
        <div style={styles.funcArea}>
          <div style={styles.actionContainer}>
            <TiEdit style={styles.actionIcon} className={'icon'}/>
            <Link style={styles.link} to={'edit'}>Create a PPT</Link>
          </div>
          <div style={styles.actionContainer}>
            <TiDeviceDesktop style={styles.actionIcon} className={'icon'}/>
            <Link style={styles.link} to={'project'}>Start a Project</Link>
          </div>
          <div style={Object.assign({},styles.actionContainer,styles.uploadArea)}>
            <Dropzone onDrop={this._onDrop}>
              <TiUpload style={styles.actionIcon} className={'icon'}/>
              <div style={styles.link}>Drop local files</div>
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container:{
    color:'rgb(226, 182, 27)',
    overflow:'auto',
    width:'100%'
  },
  searchBox:{
    marginTop:50,
    marginBottom:50,
  },
  actionIcon:{
    fontSize:100,
    display:'block',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'30px',
  },
  actionContainer:{
    width:200,
    height:200,
    borderRadius:10,
    borderWidth:2,
    borderColor:'rgb(184, 187, 8)',
    borderStyle:'dashed',
    float:'left',
    margin:'0 20px 0 0'
  },
  uploadArea:{
    border:'none'
  },
  link:{
    textDecoration:'none',
    fontSize:20,
    color:'rgb(226, 182, 27)',
    display:'block',
    margin:'20px 25px 0 30px',
  }
}
