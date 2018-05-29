import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import App from './components/App'
import * as stores from './stores'

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)
