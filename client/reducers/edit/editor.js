import * as ActionTypes from '../../constants/ActionTypes'

const initialState = {
  editPosition: 0,
  generalInfo: {
    "title":'',
    "subTitle":'',
    "author":'',
    "company":'',
    "email":'',
  },
  generalInfoStr:'',
  slideInfoStr:'',
  slidesContent:[],
  previewShow: false,
}

function transToString(obj){
  let ret = ''
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
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
    obj[match[1]] = v
    match = reg.exec(str)
  }
  return obj
}

export default function editor(state = initialState, action){
  let slides = state.slidesContent.slice()
  switch(action.type){
    case ActionTypes.ADD_SLIDE:
      slides.splice(state.editPosition + 1, 0, {})
      return {
        ...state,
        slidesContent: slides,
        editPosition: state.editPostion + 1
      }
    case ActionTypes.DELETE_SLIDE:
      slides.splice(state.editPosition, 1)
      return {
        ...state,
        slidesContent: slides
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
        generalInfo: transToObj(state.generalInfoStr)
      }
    case ActionTypes.TRANSFORM_SLIDE_INFO:
      slides.splice(state.editPosition, 1, transToObj(state.slideInfoStr))
      return {
        ...state,
        slidesContent: slides
      }
    default:
      return state
  }
}
