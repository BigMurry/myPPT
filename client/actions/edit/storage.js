import * as ActionTypes from '../../constants/ActionTypes'
import {transformGeneralInfo, transformSlideInfo} from './editor'
import API from '../../../.config/api.conf'

const TIME_OUT = 2000

export function saveSlideIfNeeded(isForce){
  return (dispatch, getState) => {
    const {
      generalInfoChanged,
      generalInfoLastChange,
      slideContentChanged,
      slideContentLastChange,
    } = getState().edit.storage
    const now = new Date().getTime()
    if(generalInfoChanged && (isForce || (now - generalInfoLastChange) >= TIME_OUT)){
      dispatch(saveGeneralInfo())
    }
    if(slideContentChanged && (isForce ||(now - slideContentLastChange) >= TIME_OUT)){
      dispatch(saveSlidesInfo())
    }
  }
}

export function saveGeneralInfo(){
  return (dispatch, getState) => {
    dispatch(saveGeneralInfoStart())
    dispatch(transformGeneralInfo())
    let info = getState().edit.editor.generalInfo
    fetch(API.STORE_GENERAL,{
      method:'post',
      header:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        info
      })
    })
    .then(reponse => response.json())
    .then(json => dispatch(saveGeneralInfoEnd()))
    .catch(e => {
      dipatch(saveGeneralInfoEnd(e))
    })
  }
}

export function saveSlidesInfo(){
  return (dispatch, getState) => {
    dispatch(saveSlideInfoStart())
    dispatch(transformSlideInfo())
    let state = getState().edit.editor
    let info = state.slidesContent[state.editPosition]
    fetch(API.STORE_SLIDE, {
      method:'post',
      header:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        info
      })
    })
    .then(response => response.json())
    .then(json => dispatch(saveSlideInfoEnd()))
    .catch(e => {
      dispatch(saveSlideInfoEnd(e))
    })
  }
}

export function generalInfoChanged(){
  return {
    type: ActionTypes.GENERAL_INFO_CHANGED
  }
}

export function slideContentChanged(){
  return {
    type: ActionTypes.SLIDE_CONTENT_CHANGED
  }
}

function saveGeneralInfoStart(){
  return {
    type: ActionTypes.SAVE_GENERAL_INFO_START
  }
}

function saveGeneralInfoEnd(){
  return {
    type: ActionTypes.SAVE_GENERAL_INFO_END
  }
}

function saveSlideInfoStart(){
  return {
    type: ActionTypes.SAVE_SLIDE_INFO_START
  }
}

function saveSlideInfoEnd(){
  return {
    type: ActionTypes.SAVE_SLIDE_INFO_END
  }
}
