import React from 'react'
import { Divider } from '@material-ui/core/'

import { AuthWrapper, SingleCol } from '../components/Wrappers'
import { Layout as FieldSelector } from '../components/FieldSelector'
import { Layout as Todos } from '../components/Todos'

const ComponentsPage = () => (
  <AuthWrapper authUser>
    <SingleCol>
      <h1>Components</h1>
      <p>A place to put my opensource components</p>
      <Divider style={{ margin: `2rem 0` }} />
      <FieldSelector />
      <Divider style={{ margin: `2rem 0` }} />
      <Todos />
      <Divider style={{ margin: `2rem 0` }} />
    </SingleCol>
  </AuthWrapper>
)

export default ComponentsPage
