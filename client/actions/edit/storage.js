import * as ActionTypes from '../../constants/ActionTypes'
import {transformGeneralInfo, transformSlideInfo} from './editor'

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
    //TODO: save data to DB
    setTimeout(function(){
      dispatch(saveGeneralInfoEnd())
    }, 2000)
  }
}

export function saveSlidesInfo(){
  return (dispatch, getState) => {
    dispatch(saveSlideInfoStart())
    dispatch(transformSlideInfo())
    //TODO: save data to DB
    setTimeout(function(){
      dispatch(saveSlideInfoEnd())
    }, 2000)
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
