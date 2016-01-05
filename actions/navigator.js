import * as types from '../constants/ActionTypes'

export function forward(step=1){
  return {
    type: types.FORWARD,
    step
  }
}

export function backward(step=1){
  return {
    type: types.BACKWARD,
    step
  }
}

export function goto(step){
  return {
    type: types.GOTO,
    step
  }
}
