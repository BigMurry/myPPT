import * as types from '../../constants/ActionTypes'

const initialState = {
  begin: true,
  end: false
}
export default function progress(state = initialState, action){
  switch(action.type){
    case types.STARTPROJECT:
      return Object.assign({}, state, {begin: action.atBeginning})
    case types.ENDPROJECT:
      return Object.assign({}, state, {end: action.atEnding})
    default:
      return state
  }
}
