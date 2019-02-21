import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'components/App/App'
import * as serviceWorker from 'serviceWorker'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from 'reducers/RootReducer'
import { loggedInAction } from 'actions/AuthActions'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

if (localStorage.username && localStorage.email) {
  store.dispatch(loggedInAction({
    username: localStorage.username,
    email: localStorage.email
  }))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
