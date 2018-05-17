import React from 'react'
import { NavLink } from 'react-router-dom'

import { inject, observer } from 'mobx-react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'

import './SideNav.css'

const SideNav = inject('uiStore')(
  observer(({ uiStore }) => (
    <Sidebar
      as={Menu}
      animation="overlay"
      visible={uiStore.sidebarVisible}
      vertical={true}
      className="sidenav"
      inverted={true}
      onMouseEnter={uiStore.sidebarToggleVisibility}
      onMouseLeave={uiStore.sidebarToggleVisibility}
    >
      <div className="sidenav--brand">
        <NavLink to="/">
          <Menu.Item as="h3" inverted="true">
            SomeApp
            <Icon
              name="sidebar"
              onClick={uiStore.sidebarToggleVisibility}
              style={{ cursor: 'pointer' }}
            />
          </Menu.Item>
        </NavLink>
      </div>
      <div className="sidenav--primary-menu">
        <NavLink to="/list">
          <Menu.Item name="list">
            Remote List
            <Icon name="briefcase" />
          </Menu.Item>
        </NavLink>
      </div>
      <div className="sidenav--account-menu">
        <NavLink to="/help">
          <Menu.Item name="home2">
            Help
            <Icon name="help circle" />
          </Menu.Item>
        </NavLink>
      </div>
      <div className="sidenav--footer">
        <NavLink to="/settings">
          <Menu.Item name="home2">
            Settings
            <Icon name="setting" />
          </Menu.Item>
        </NavLink>
      </div>
    </Sidebar>
  ))
)

export default SideNav
