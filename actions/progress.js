import * as types from '../constants/ActionTypes'

export function setup(){
  return (dispatch, getState) => {
    const {navigator, slides} = getState()
    if(navigator.currentStep === 0){
      dispatch(startProject(true))
    }else{
      dispatch(startProject(false))
    }
    if(navigator.currentStep === slides.length){
      dispatch(endProject(true))
    }else{
      dispatch(endProject(false))
    }
  }
}

function startProject(atBeginning){
  return {
    type: types.STARTPROJECT,
    atBeginning
  }
}

function endProject(atEnding){
  return {
    type: types.ENDPROJECT,
    atEnding
  }
}
