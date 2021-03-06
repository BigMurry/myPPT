import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import configureStore, {simpleRouterMiddleware, history} from './store/configureStore'
import {Provider} from 'react-redux'
import routes from './routes'
import App from './containers/App'
import './styles/index.scss'

//NOTE: react backend rendering, get the redux initial state
const store = configureStore(window.__INITIAL_STATE__)
simpleRouterMiddleware.listenForReplays(store)

render(
  <Provider store = {store}>
    <App history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
