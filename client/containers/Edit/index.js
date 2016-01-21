import React from 'react'
import Button from '../../components/Button'
import TiPlus from 'react-icons/lib/ti/plus'
import MdHourglassEmpty from 'react-icons/lib/md/hourglass-empty'
import MdDone from 'react-icons/lib/md/done'
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

  get savingGeneralInfoStatus(){
    const {savingGeneral} = this.props
    if(savingGeneral){
      return (
        <span><MdHourglassEmpty /> saving general info...</span>
      )
    }else{
      return (
        <span><MdDone /> general info has been saved.</span>
      )
    }
  }

  get savingSlideInfoStatus(){
    const {savingSlide} = this.props
    return savingSlide ?
        <span><MdHourglassEmpty /> saving slide info...</span>:
        <span><MdDone /> slide info has been saved.</span>

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
      generalInfoStr,
      slideInfoStr,
      slidesContent,
      editPosition,
    } = this.props

    return (
      <div className={'content-container'}>
        <div className={styles.editContainer}>
          <div className={styles.generalBlock}>
            <p className={styles['block-title']}>General Information</p>
            <div className={styles.saveMsg}>{this.savingGeneralInfoStatus}</div>
            <textarea
              className = {`${styles.textArea} ${styles.generalEdit}`}
              value = {generalInfoStr}
              onChange = {this._handleGeneralChange}
            />
          </div>
          <div className={styles.displayBlock}>
            <Button onClick={this._onAdd}>
              <TiPlus className={cn('icon', styles.addIcon)}/>
            </Button>
            <Button className={styles.count}>
              <div className={`${styles.btnInner} ${styles.left}`}>{editPosition}</div>
              <div className={`${styles.btnInner} ${styles.right}`}>{slidesContent.length}</div>
            </Button>
          </div>
          <div className={styles.slidesBlock}>
            <p className={styles['block-title']}>Slides Information</p>
            <div className={styles.saveMsg}>{this.savingSlideInfoStatus}</div>
            <textarea
              className = {`${styles.textArea} ${styles.slidesEdit}`}
              value = {slideInfoStr}
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
  const s = state.edit
  return {
    editPosition: s.editor.editPosition,
    generalInfo: s.editor.generalInfo,
    slidesContent: s.editor.slidesContent,
    generalInfoStr: s.editor.generalInfoStr,
    slideInfoStr: s.editor.slideInfoStr,
    savingSlide: s.storage.savingSlide,
    savingGeneral: s.storage.savingGeneral,
  }
}

export default connect(mapStateToProps)(Edit)
