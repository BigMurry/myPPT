import React from 'react'
import Button from '../../components/Button'
import TiPlus from 'react-icons/lib/ti/plus'
import classnames from 'classnames'
import styles from './style.scss'

let{
  Component
} = React

export default class Edit extends Component{

  constructor(props){
    super(props)
    this.state = {
      slidesCount:0
    }
    this._onAdd = this._onAdd.bind(this)
  }

  _onAdd(){
    console.log(styles)
  }

  render(){
    return (
      <div className={'content-container'}>
        <div className={styles.editContainer}>
          <div className={styles.generalBlock}>
            <p>General Information</p>
            <textarea className={classnames(styles.textArea, styles.generalEdit)}>
            </textarea>
          </div>
          <div className={styles.displayBlock}>
            <Button onClick={this._onAdd}>
              <TiPlus className={classnames('icon',styles.addIcon)}/>
            </Button>
            <Button className={styles.count}>
              <div>{this.state.slidesCount}</div>
            </Button>
          </div>
          <div className={styles.slidesBlock}>
            <p>Slides Information</p>
            <textarea className={classnames(styles.textArea,styles.slidesEdit)}></textarea>
          </div>
        </div>
        <div className={styles.previewContainer}></div>
      </div>
    )
  }
}
