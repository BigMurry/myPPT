import * as types from '../constants/ActionTypes'
import slidesUrl from '../resources/slides.json'

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

export function fetchSlidesIfNeeded(slides){
  return (dispatch, getState) => {
    if(!slides || !slides.slides || slides.slides.length === 0){
      dispatch(fetchSlides())
    }
  }
}

function fetchSlides(){
  return (dispatch) => {
    fetch(slidesUrl)
    .then(response => response.json())
    .then(json => dispatch(setSlides(json)))
    .catch(error => {
      console.log(error)
    })
  }
}

function setSlides(slides){
  return {
    type: types.SETSLIDES,
    slides
  }
}
