import React from 'react'
import { Divider } from '@material-ui/core/'

import { AuthWrapper, SingleCol } from '../components/Wrappers'
import { Layout as FieldSelector } from '../components/FieldSelector'

const ComponentsPage = () => (
  <AuthWrapper authUser>
    <SingleCol>
      <h1>Components</h1>
      <p>A place to put my opensource components</p>
      <Divider style={{ margin: `2rem 0` }} />
      <FieldSelector />
    </SingleCol>
  </AuthWrapper>
)

export default ComponentsPage
