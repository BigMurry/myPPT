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
