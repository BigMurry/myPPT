import * as ActionTypes from '../../constants/ActionTypes'

const initialState = {
  editPosition: 0,
  generalInfo: {},
  slidesContent:[],
  previewShow: false,
}

export default function editor(state = initialState, action){
  let slides = state.slidesContent.slice()
  switch(action.type){
    case ActionTypes.ADD_SLIDE:
      slides.splice(state.editPosition + 1, 0, {})
      return {
        ...state,
        slidesContent: slides,
        editPosition: state.editPostion + 1
      }
    case ActionTypes.DELETE_SLIDE:
      slides.splice(state.editPosition, 1)
      return {
        ...state,
        slidesContent: slides
      }
    case ActionTypes.OPEN_PREVIEW:
      return {
        ...state,
        previewShow: true
      }
    case ActionTypes.CHANGE_GENERAL_INFO:
      return {
        ...state,
        generalInfo: action.generalInfo
      }
    case ActionTypes.CHANGE_SLIDES_CONTENT:
      slides.splice(state.editPosition, 1, action.content)
      return {
        ...state,
        slidesConent: slides
      }
    default:
      return state
  }
}
