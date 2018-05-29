import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import App from './components/App'
import store from './stores'

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
