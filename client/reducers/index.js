import {combineReducers} from 'redux'
import {routeReducer} from 'redux-simple-router'
import project from './project'
import edit from './edit'

const rootReducer = combineReducers({
  project,
  edit,
  routing: routeReducer
})

export default rootReducer
