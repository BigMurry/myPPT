import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {syncHistory} from 'redux-simple-router'
import rootReducer from '../reducers/index'

const simpleRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  simpleRouterMiddleware
)(createStore)

export default function configureStore(initialState){
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}
