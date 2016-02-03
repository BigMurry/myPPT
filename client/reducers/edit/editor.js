import * as ActionTypes from '../../constants/ActionTypes'

const initialState = {
  editPosition: 0,
  generalInfo: {
    "_id":'g1',
    "_v":0,
    "title":'How to learn Nodejs',
    "subTitle":'A foo ppt example',
    "author":'murry.diao',
    "company":'avepoint',
    "email":'murry.diao@avepoint.com',
  },
  generalInfoSlug:'',
  slideInfoSlug:'',
  generalInfoStr:'',
  slideInfoStr:'',
  slidesContent:[
    {
      "_id":'s1',
      "_v":0,
      "head":'Outlines',
      "content":'## what is nodejs\n ## how to use Nodejs\n'
    }
  ],
  previewShow: false,
}

function transToString(obj){
  let ret = ''
  for(let key in obj){
    if(obj.hasOwnProperty(key) && key !== '_id' && key !== '_v'){
      ret +=`[${key}]${obj[key]}\n`
    }
  }
  return ret
}

function transToObj(str){
  let obj = {},
      reg = /\[([^\]\[]+)\]([^\]\[]*)/g
  let match = reg.exec(str)
  while(match){
    let v = match[2].replace(/\n$/,'')
    if(match[1] !== '_id' && match[1] !== '_v'){
      obj[match[1]] = v
    }
    match = reg.exec(str)
  }
  return obj
}

export default function editor(state = initialState, action){
  let slides = state.slidesContent.slice()
  switch(action.type){
    case ActionTypes.ADD_SLIDE:
      slides.splice(state.editPosition + 1, 0, null)
      return {
        ...state,
        slidesContent: slides,
        editPosition: state.editPosition + 1
      }
    case ActionTypes.DELETE_SLIDE:
      slides.splice(state.editPosition, 1)
      return {
        ...state,
        slidesContent: slides
      }
    case ActionTypes.EDIT_PREVIOUS:
      return {
        ...state,
        editPosition: state.editPosition - 1
      }
    case ActionTypes.EDIT_NEXT:
      return {
        ...state,
        editPosition: state.editPosition + 1
      }
    case ActionTypes.OPEN_PREVIEW:
      return {
        ...state,
        previewShow: true
      }
    case ActionTypes.CHANGE_GENERAL_INFO:
      return {
        ...state,
        generalInfoStr: action.generalInfo
      }
    case ActionTypes.CHANGE_SLIDES_CONTENT:
      return {
        ...state,
        slideInfoStr: action.content
      }
    case ActionTypes.TRANSFORM_GENERAL_INFO:
      return {
        ...state,
        generalInfo: Object.assign({},state.generalInfo, transToObj(state.generalInfoStr))
      }
    case ActionTypes.TRANSFORM_SLIDE_INFO:
      slides.splice(state.editPosition, 1, Object.assign({},state.slidesContent[state.editPosition], transToObj(state.slideInfoStr)))
      return {
        ...state,
        slidesContent: slides
      }
    case ActionTypes.RELOAD_GENERAL_INFO:
      return {
        ...state,
        generalInfoStr: transToString(state.generalInfo)
      }
    case ActionTypes.RELOAD_SLIDE_INFO:
      return {
        ...state,
        slideInfoStr: transToString(state.slidesContent[state.editPosition])
      }
    default:
      return state
  }
}
