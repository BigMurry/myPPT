import * as ActionTypes from '../../constants/ActionTypes'

export function saveGeneralInfo(){
  return {
    type: ActionTypes.SAVE_GENERAL_INFO
  }
}

export function saveSlidesInfo(){
  return {
    type: ActionTypes.SAVE_SLIDES_INFO
  }
}

export function changeGeneralInfo(){
  return {
    type: ActionTypes.CHANGE_GENERAL_INFO
  }
}

export function changeSlidesContent(){
  return {
    type: ActionTypes.CHANGE_SLIDES_CONTENT
  }
}
