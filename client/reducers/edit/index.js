import {combineReducers} from 'redux'
import editor from './editor'
import storage from './storage'

const rootReducer = combineReducers({
  editor,
  storage
})
