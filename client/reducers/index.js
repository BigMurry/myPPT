import {combineReducers} from 'redux'
import navigator from '../reducers/navigator'
import slides from '../reducers/slides'
import progress from '../reducers/progress'
import {routeReducer} from 'redux-simple-router'

const rootReducer = combineReducers({
  navigator,
  slides,
  progress,
  routing: routeReducer
})

export default rootReducer
