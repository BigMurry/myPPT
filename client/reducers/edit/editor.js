import * as ActionTypes from '../../constants/ActionTypes'

export const ADD_SLIDE = "ADD_SLIDE"
export const DELETE_SLIDE = "DELETE_SLIDE"
export const OPEN_PREVIEW = "OPEN_PREVIEW"

export const SAVE_SLIDES_INFO = "SAVE_SLIDES_INFO"
export const SAVE_GENERAL_INFO = "SAVE_GENERAL_INFO"
export const CHANGE_GENERAL_INFO = "CHANGE_GENERAL_INFO"
export const CHANGE_SLIDES_CONTENT = "CHANGE_SLIDES_CONTENT"

const initialState = {
  editPosition: 0,
  generalInfo: {},
  slidesContent:[],
  previewShow: false,
}

export default function editor(state = initialState, action){
  switch(action.type){
    case ActionTypes.ADD_SLIDE:
      let slides = state.slidesContent.slice()
      slides.
      return Object.assign({}, state, {editPosition: })
    case ActionTypes.DELETE_SLIDE:
    case ActionTypes.OPEN_PREVIEW:
    default:
      return state
  }
}
