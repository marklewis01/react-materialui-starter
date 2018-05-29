import React, { Fragment } from 'react'
import { Segment } from 'semantic-ui-react'

import Launcher from '../../components/ModalLightweight'

class DragPage extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>Lets Drag</h1>
        <Launcher buttonLabel="Open Modal">
          <div className="textModal">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Nullam tincidunt, nisl eget vestibulum rhoncus, elit nisi faucibus
              quam, sollicitudin posuere massa lacus cursus ligula. Quisque vel
              turpis a quam posuere lobortis. Aenean risus nunc, pretium eu
              massa tincidunt, dignissim tincidunt arcu. Integer et mauris
              vestibulum, pharetra eros nec, feugiat orci.
            </p>
          </div>
        </Launcher>
        <Segment>ok</Segment>
      </Fragment>
    )
  }
}

export default DragPage
