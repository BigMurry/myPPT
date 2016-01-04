import * as types from '../constants/ActionTypes'

const initialState = {
  id:'',
  author:{},
  header:{},
  footer:{},
  slides:[]
}

export default function slides(state=initialState, action){
  switch(action.type){
    case types.SETSLIDES:
      return Object.assign({}, state, {
        author: action.slides.author,
        header: action.slides.header,
        footer: action.slides.footer,
        slides: action.slides.slides
      })
    case types.SETFILEID:
      return Object.assign({}, state, {id: action.id})
    default:
      return state
  }
}
