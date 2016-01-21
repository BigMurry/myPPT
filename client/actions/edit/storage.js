import * as ActionTypes from '../../constants/ActionTypes'
import {transformGeneralInfo, transformSlideInfo} from './editor'

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
