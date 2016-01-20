import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistory} from 'redux-simple-router'
import rootReducer from '../reducers'

let history = createBrowserHistory()
const simpleRouterMiddleware = syncHistory(history)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  simpleRouterMiddleware
)(createStore)

export default function configureStore(initialState){
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}

export {simpleRouterMiddleware, history}
