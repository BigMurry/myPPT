import {combineReducers} from 'redux'
import navigator from '../reducers/navigator'
import slides from '../reducers/slides'

const rootReducer = combineReducers({
  navigator,
  slides
})

export default rootReducer
