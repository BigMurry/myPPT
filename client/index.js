import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import {syncReduxAndRouter} from 'redux-simple-router'
import history from 'history'
import routes from './routes'
import App from './containers/App'
import './styles/index.css'

//NOTE: react backend rendering, get the redux initial state
const store = configureStore(window.__INITIAL_STATE__)

syncReduxAndRouter(history, store, (state) => state.router)

render(
  <Provider store = {store}>
    <App history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)