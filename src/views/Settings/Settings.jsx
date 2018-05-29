import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Tab } from 'semantic-ui-react'

import './Settings.css'

const panes = [
  {
    menuItem: 'Personal Settings',
    render: () => (
      <Tab.Pane attached={false} className={'settings-pane'}>
        Tab 1 Content
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Organisation Settings',
    render: () => (
      <Tab.Pane attached={false} className={'settings-pane'}>
        Tab 2 Content
      </Tab.Pane>
    )
  }
]

const Settings = inject('uiStore')(
  observer(({ uiStore }) => (
    <Fragment>
      <h1>Settings</h1>

      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        className={'settings-menu'}
      />
      <div>
        <button
          onClick={() => {
            uiStore.createAlert(Date.now())
          }}
        >
          Notify
        </button>
      </div>
    </Fragment>
  ))
)

export default Settings
