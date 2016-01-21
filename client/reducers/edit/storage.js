import * as ActionTypes from '../../constants/ActionTypes'

const initialState = {
  savingGeneral: false,
  savingSlide: false,
}

export default function storage(state = initialState, action){
  switch(action.type){
    //case ActionTypes.SAVE_GENERAL_INFO:
    //case ActionTypes.SAVE_SLIDES_INFO:
    case ActionTypes.SAVE_GENERAL_INFO_START:
      return {
        ...state,
        savingGeneral: true
      }
    case ActionTypes.SAVE_GENERAL_INFO_END:
      return {
        ...state,
        savingGeneral: false
      }
    case ActionTypes.SAVE_SLIDE_INFO_START:
      return {
        ...state,
        savingSlide: true
      }
    case ActionTypes.SAVE_SLIDE_INFO_END:
      return {
        ...state,
        savingSlide: false
      }
    default:
      return state
  }
}
