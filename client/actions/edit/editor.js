import * as ActionTypes from '../../constants/ActionTypes'

export function addSlide(){
  return {
    type: ActionTypes.ADD_SLIDE
  }
}

export function deleteSlide(){
  return {
    type: ActionTypes.DELETE_SLIDE
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
