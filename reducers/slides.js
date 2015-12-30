import * as types from '../constants/ActionTypes'

const initialState = {
  author:{},
  header:{},
  footer:{},
  slides:[]
}

export default function slides(state=initialState, action){
  switch(action.type){
    case types.SETSLIDES:
      return Object.assign({}, state, {slides: action.slides})
    default:
      return state
  }
}
