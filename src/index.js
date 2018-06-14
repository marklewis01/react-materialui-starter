import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'unstated'

import App from './components/App'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
