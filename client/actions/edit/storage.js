import * as ActionTypes from '../../constants/ActionTypes'
import {transformGeneralInfo, transformSlideInfo} from './editor'

const TIME_OUT = 2000

export function saveSlideIfNeeded(){
  return (dispatch, getState) => {
    const {
      generalInfoChanged,
      generalInfoLastChange,
      slideContentChanged,
      slideContentLastChange,
    } = getState().edit.storage
    const now = new Date().getTime()
    if(generalInfoChanged && (now - generalInfoLastChange) >= TIME_OUT){
      dispatch(saveGeneralInfo())
    }
    if(slideContentChanged && (now - slideContentLastChange) >= TIME_OUT){
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
