import * as ActionTypes from '../../constants/ActionTypes'
import {saveSlidesInfo} from './storage'

function goPrevious(){
  return {
    type: ActionTypes.EDIT_PREVIOUS
  }
}

function goNext(){
  return {
    type: ActionTypes.EDIT_NEXT
  }
}

function removeSlide(){
  return {
    type: ActionTypes.DELETE_SLIDE
  }
}


export function addSlide(){
  return {
    type: ActionTypes.ADD_SLIDE
  }
}

export function deleteSlide(){
  return (dispatch, getState) => {
    let state = getState().edit.editor,
        pos = state.editPosition,
        len = state.slidesContent.length
    if(len > 0){
      dispatch(removeSlide())
      if(pos !== 0){
        dispatch(goPrevious())
      }
    }
    dispatch(reloadSlideInfo())
  }
}

export function editPrevious(){
  return (dispatch, getState) => {
    dispatch(saveSlidesInfo())
    dispatch(goPrevious())
    dispatch(reloadSlideInfo())
  }
}

export function editNext(){
  return (dispatch, getState) => {
    dispatch(saveSlidesInfo())
    dispatch(goNext())
    dispatch(reloadSlideInfo())
  }
}

export function reloadIfNeeded(){
  return (dispatch, getState) => {
    let state = getState().edit.editor
    if(state.generalInfoId !== state.generalInfo.id){
      dispatch(reloadGeneralInfo())
    }
    if(state.slideInfoId !== state.slidesContent[state.editPosition].id){
      dispatch(reloadSlideInfo())
    }
  }
}

export function reloadGeneralInfo(){
  return {
    type: ActionTypes.RELOAD_GENERAL_INFO
  }
}

export function reloadSlideInfo(){
  return {
    type: ActionTypes.RELOAD_SLIDE_INFO
  }
}

export function openPreview(){
  return {
    type: ActionTypes.OPEN_PREVIEW
  }
}

export function changeGeneralInfo(generalInfo){
  return {
    type: ActionTypes.CHANGE_GENERAL_INFO,
    generalInfo
  }
}

export function changeSlidesContent(content){
  return {
    type: ActionTypes.CHANGE_SLIDES_CONTENT,
    content
  }
}

export function transformSlideInfo(){
  return {
    type: ActionTypes.TRANSFORM_SLIDE_INFO
  }
}

export function transformGeneralInfo(){
  return {
    type: ActionTypes.TRANSFORM_GENERAL_INFO
  }
}
