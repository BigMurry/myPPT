import React from 'react'
import Button from '../../components/Button'
import TiPlus from 'react-icons/lib/ti/plus'
import {connect} from 'react-redux'
import cn from 'classnames'
import styles from './style.scss'
import {editor, storage} from '../../actions/edit'

let{
  Component
} = React

const {
  addSlide,
  deleteSlide,
  openPreview,
  changeGeneralInfo,
  changeSlidesContent,
} = editor

const {
  saveGeneralInfo,
  saveSlidesInfo,
} = storage

const TIME_OUT = 2000

class Edit extends Component{
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
    saving:false,
    generalInfo:{
      "title":'',
      "subTitle":'',
      "author":'',
      "company":'',
      "email":'',
    },
    slidesContent:[]
  }

  constructor(props){
    super(props)

    this.state = {
      generalInfoChanged: false,
      slidesInfoChanged: false,
      generalInfoLastChange: 0,
      slidesInfoLastChange:0,
    }

    this._onAdd = this._onAdd.bind(this)
    this._onDelete = this._onDelete.bind(this)
    this._onCountClick = this._onCountClick.bind(this)
    this._handleGeneralChange = this._handleGeneralChange.bind(this)
    this._handleSlidesChange = this._handleSlidesChange.bind(this)
    this._timmerHandle = this._timmerHandle.bind(this)
  }

  componentWillMount(){
    this.timmer = setInterval(this._timmerHandle, TIME_OUT)
  }

  componentWillUnmount(){
    clearInterval(this.timmer)
  }

  _timmerHandle(){
    const {dispatch} = this.props
    let {
      generalInfoChanged,
      slidesInfoChanged,
      generalInfoLastChange,
      slidesInfoLastChange,
    } = this.state

    const now = new Date().getTime()

    if(generalInfoChanged && (now - generalInfoLastChange) >= TIME_OUT){
        dispatch(saveGeneralInfo())
        this.setState({generalInfoChanged: false})
      }
      if(slidesInfoChanged && (now - slidesInfoLastChange) >= TIME_OUT){
        dispatch(saveSlidesInfo())
        this.setState({slidesInfoChanged: false})
      }
  }

  _onAdd(){
    const {dispatch} = this.props
    dispatch(addSlide())
  }

  _onDelete(idx){
    const {dispatch} = this.props
    dispatch(deleteSlide(idx))
  }

  _onCountClick(){
    const {dispatch} = this.props
    dispatch(openPreview())
  }

  _handleGeneralChange(e){
    const {dispatch} = this.props
    dispatch(changeGeneralInfo(e.target.value))
    this.setState({
      generalInfoChanged: true,
      generalInfoLastChange: new Date().getTime()
    })
  }

  _handleSlidesChange(e){
    const {dispatch} = this.props
    dispatch(changeSlidesContent(e.target.value))
    this.setState({
      slidesInfoChanged: true,
      slidesInfoLastChange: new Date().getTime()
    })
  }

  render(){

    const {
      generalInfo,
      slidesContent,
      editPosition
    } = this.props

    return (
      <div className={'content-container'}>
        <div className={styles.editContainer}>
          <div className={styles.generalBlock}>
            <p>General Information</p>
            <textarea
              className = {cn(styles.textArea, styles.generalEdit)}
              value = {transToString(generalInfo)}
              onChange = {this._handleGeneralChange}
            />
          </div>
          <div className={styles.displayBlock}>
            <Button onClick={this._onAdd}>
              <TiPlus className={cn('icon', styles.addIcon)}/>
            </Button>
            <Button className={styles.count}>
              <div>{slidesContent.length}</div>
            </Button>
          </div>
          <div className={styles.slidesBlock}>
            <p>Slides Information</p>
            <textarea
              className = {cn(styles.textArea,styles.slidesEdit)}
              value = {transToString(slidesContent[editPosition])}
              onChange = {this._handleSlidesChange}
            />
          </div>
        </div>
        <div className={styles.previewContainer}></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    editPosition: state.edit.position,
    generalInfo: state.edit.generalInfo,
    slidesContent: state.edit.slidesContent
  }
}

export default connect(mapStateToProps)(Edit)
