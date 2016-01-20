import {combineReducers} from 'redux'
import navigator from './navigator'
import slides from './slides'
import progress from './progress'

const rootReducer = combineReducers({
  navigator,
  slides,
  progress,
})

export default rootReducer
