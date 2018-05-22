import React from 'react'

import Dashboard from '../pages/Dashboard'
import DragPage from '../pages/DragPage'
import List from '../components/List'
import Settings from '../pages/Settings'

const Help = () => (
  <div>
    <h1>The Help Page</h1>
  </div>
)

const routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/drag',
    component: DragPage
  },
  {
    path: '/help',
    component: Help
  },
  {
    path: '/list',
    component: List
  },
  {
    path: '/settings',
    component: Settings
  }
]

export default routes
