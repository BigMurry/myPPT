import React from 'react'
import Button from '../../components/Button'
import TiPlus from 'react-icons/lib/ti/plus'
import {connect} from 'react-redux'
import cn from 'classnames'
import styles from './style.scss'

let{
  Component
} = React

class Edit extends Component{

  constructor(props){
    super(props)
    this._onAdd = this._onAdd.bind(this)
  }

  static transToString(obj){
    let ret = ''
    for(let key in obj){
      if(obj.hasOwnProperty(key)){
        ret +=`[${key}]${obj[key]}\n`
      }
    }
    return ret
  }

  static defaultProps = {
    slidesCount:0,
    editPosition:0,
    generalInfo:{
      "title":'',
      "subTitle":'',
      "author":'',
      "company":'',
      "email":'',
    },
    slidesContent:[]
  }

  _onAdd(){
    console.log(styles)
  }

  render(){

    const {
      slidesCount,
      generalInfo,
      slidesContent,
      editPosition
    } = this.props

    return (
      <div className={'content-container'}>
        <div className={styles.editContainer}>
          <div className={styles.generalBlock}>
            <p>General Information</p>
            <textarea className={cn(styles.textArea, styles.generalEdit)}>
              {transToString(eneralInfo)}
            </textarea>
          </div>
          <div className={styles.displayBlock}>
            <Button onClick={this._onAdd}>
              <TiPlus className={cn('icon', styles.addIcon)}/>
            </Button>
            <Button className={styles.count}>
              <div>{slidesCount}</div>
            </Button>
          </div>
          <div className={styles.slidesBlock}>
            <p>Slides Information</p>
            <textarea className={cn(styles.textArea,styles.slidesEdit)}>
              {transToString(slidesContent[editPosition])}
            </textarea>
          </div>
        </div>
        <div className={styles.previewContainer}></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    slidesCount: state.edit.slidesCount,
    editPosition: state.edit.position,
    generalInfo: state.edit.generalInfo,
    slidesContent: state.edit.slidesContent
  }
}

export default connect(mapStateToProps)(Edit)
