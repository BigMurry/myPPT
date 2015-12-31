import * as types from '../constants/ActionTypes'

const initialState = {
  currentStep:0
}

export default function navigator(state=initialState, action){
  let step = 0
  switch(action.type){
    case types.FORWARD:
      step = state.currentStep + action.step
      step = step > 0 ? step : 0
      return Object.assign({}, state, {currentStep: step})
    case types.BACKWARD:
      step = state.currentStep - action.step
      step = step > 0 ? step : 0
      return Object.assign({}, state, {currentStep: step})
    case types.GOTO:
      step = action.step >=0 ? action.step : 0
      return Object.assign({}, state, {currentStep: step})
    default:
      return state
  }
}
