import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { BrowserRouter } from 'react-router-dom'
import { legacy_createStore } from 'redux'
import { Provider } from 'react-redux'

import appReducer from './appReducer.jsx'

const appStore = legacy_createStore(appReducer)


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter>
)
