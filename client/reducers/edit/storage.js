import * as ActionTypes from '../../constants/ActionTypes'

const initialState = {
  savingGeneral: false,
  savingSlide: false,
  generalInfoChanged: false,
  generalInfoLastChange: 0,
  slideContentChanged: false,
  slideContentLastChange: 0,
}

export default function storage(state = initialState, action){
  switch(action.type){
    //case ActionTypes.SAVE_GENERAL_INFO:
    //case ActionTypes.SAVE_SLIDES_INFO:
    case ActionTypes.GENERAL_INFO_CHANGED:
      return {
        ...state,
        generalInfoChanged: true,
        generalInfoLastChange: new Date().getTime()
      }
    case ActionTypes.SLIDE_CONTENT_CHANGED:
      return {
        ...state,
        slideContentChanged: true,
        slideContentLastChange: new Date().getTime()
      }
    case ActionTypes.SAVE_GENERAL_INFO_START:
      return {
        ...state,
        savingGeneral: true
      }
    case ActionTypes.SAVE_GENERAL_INFO_END:
      return {
        ...state,
        savingGeneral: false,
        generalInfoChanged: false,
      }
    case ActionTypes.SAVE_SLIDE_INFO_START:
      return {
        ...state,
        savingSlide: true
      }
    case ActionTypes.SAVE_SLIDE_INFO_END:
      return {
        ...state,
        savingSlide: false,
        slideContentChanged: false,
      }
    default:
      return state
  }
}
