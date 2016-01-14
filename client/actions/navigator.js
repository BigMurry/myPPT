import * as types from '../constants/ActionTypes'
import {setup} from '../actions/progress'

export function forward(step = 1){
  return (dispatch, getState) => {
    dispatch(_forward(step))
    dispatch(setup())
  }
}

export function backward(step = 1){
  return (dispatch, getState) => {
    dispatch(_backward(step))
    dispatch(setup())
  }
}

export function goto(step){
  return (dispatch, getState) => {
    dispatch(_goto(step))
    dispatch(setup())
  }
}
export function openNav(){
  return {
    type: types.OPENNAV
  }
}

export function closeNav(){
  return {
    type: types.CLOSENAV
  }
}

function _forward(step){
  return {
    type: types.FORWARD,
    step
  }
}

function _backward(step){
  return {
    type: types.BACKWARD,
    step
  }
}

function _goto(step){
  return {
    type: types.GOTO,
    step
  }
}
