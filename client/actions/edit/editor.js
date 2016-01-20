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
