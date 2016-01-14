import {combineReducers} from 'redux'
import navigator from '../reducers/navigator'
import slides from '../reducers/slides'
import progress from '../reducers/progress'

const rootReducer = combineReducers({
  navigator,
  slides,
  progress
})

export default rootReducer
