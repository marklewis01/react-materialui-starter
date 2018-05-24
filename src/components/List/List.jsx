import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Segment
} from 'semantic-ui-react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Launcher from '../../components/ModalLightweight'

import ProductCard from '../ProductCard'

import './List.css'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: `0 0 16px 0`,

  // styles we need to apply on draggables
  ...draggableStyle
})

const List = inject('listStore')(
  observer(
    class ObserverSpecifications extends React.Component {
      componentDidMount() {
        this.props.listStore.onPageLoad()
      }

      modalContents = item => (
        <div>
          <h3>{item.name}</h3>
          <hr />
          Email: {item.email} <br />
          Username: {item.username} <br />
          Website: {item.website} <br />
          <hr />
          <h4>Address</h4>
          {item.company.name} <br />
          {item.address.street} <br />
          {item.address.suite} <br />
          {item.address.city} <br />
          {item.address.zipcode} <br />
        </div>
      )

      onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
          return
        }

        const items = reorder(
          this.props.listStore.items,
          result.source.index,
          result.destination.index
        )

        this.props.listStore.setItems(items)
      }

      render() {
        const { listStore } = this.props

        const loading = listStore.loading ? (
          <Segment>
            <Loader active content="Fetching remote data" />
            <Image src="/assets/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null

        const cachedButton = listStore.cached ? (
          <Button fluid onClick={listStore.clearCache} color="red">
            Clear Session Cache
          </Button>
        ) : (
          <Button fluid onClick={listStore.fetchInfo} color="green">
            <Icon name="refresh" />
            Reload List
          </Button>
        )

        const header = listStore.cached ? (
          <Header as="h2">
            <span className="strikeout">Remote </span>
            <span className="correction">Now sessionStorage</span> Content
          </Header>
        ) : (
          <Header as="h2">Remote Content</Header>
        )

        return (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Grid>
              <Grid.Column floated="left" mobile={16} tablet={8} computer={8}>
                {header}
              </Grid.Column>
              <Grid.Column floated="right" mobile={16} tablet={8} computer={4}>
                {cachedButton}
              </Grid.Column>
            </Grid>
            <Segment>
              <div className="list-content-intro">
                <Grid>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    The cards/data below are fetched from a remote location.
                    <br />
                    Click the cards for even more contact information.
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={8}
                    textAlign="right"
                  >
                    {listStore.cached && (
                      <span>Data fetched at: {listStore.cachedTime}</span>
                    )}
                    {!listStore.cached && <span>No data cached</span>}
                  </Grid.Column>
                </Grid>
              </div>
              {loading}
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef}>
                    {this.props.listStore.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Launcher contents={<ProductCard item={item} />}>
                              {this.modalContents(item)}
                            </Launcher>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Segment>
          </DragDropContext>
        )
      }
    }
  )
)

export default List
