import * as types from '../constants/ActionTypes'
import slidesUrl from '../resources/slides.json'
import path from 'path'

export function fetchSlidesIfNeeded(){
  return (dispatch, getState) => {
    let state = getState()
    let newId = path.basename(slidesUrl, '.json')
    if(state.slides.id !== newId){
      dispatch(setFileId(newId))
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

function setFileHash(hash){
  return {
    type: types.SETFILEHASH,
    hash
  }
}

export function setFileId(id){
  return {
    type: types.SETFILEID,
    id
  }
}
