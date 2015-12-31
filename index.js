import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import App from './containers/App'
import './styles/index.css'

const store = configureStore()

render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
