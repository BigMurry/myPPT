import * as types from '../constants/ActionTypes'

const initialState = {
  currentStep:0
}

export default function navigator(state=initialState, action){
  switch(action.type){
    case types.FORWARD:
      let step = state.currentStep + action.step
      step = step > 0 ? step : 0
      return Object.assign({}, state, {currentStep: step})
    case types.BACKWARD:
      let step = state.currentStep - action.step
      step = step > 0 ? step : 0
      return Object.assign({}, state, {currentStep: step})
    default:
      return state
  }
}
