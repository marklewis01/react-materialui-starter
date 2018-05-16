import React from 'react'
import { inject, observer } from 'mobx-react'

const Settings = inject('uiStore')(
  observer(({ uiStore }) => (
    <div>
      <h1>The new Settings Page</h1>
      <button onClick={() => { uiStore.createAlert(Date.now()) }}>Notify</button>
    </div>
  ))
)

export default Settings;