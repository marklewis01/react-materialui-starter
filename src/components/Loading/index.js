import React from 'react'
import { inject, observer } from 'mobx-react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading = inject('uiStore')(
  observer(({ uiStore }) => {
    return (
      <Dimmer className={uiStore.loading ? 'active' : null}>
        <Loader />
      </Dimmer>
    )
  }
  ))

export default Loading