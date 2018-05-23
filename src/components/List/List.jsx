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
import Modal from 'react-modal'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import ProductCard from '../ProductCard'

import './List.css'

Modal.setAppElement('#root')

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
      constructor(props) {
        super(props)

        this.state = {
          modal: {},
          card: {}
        }
      }

      componentDidMount() {
        this.props.listStore.onPageLoad()
      }

      handleModalClick = card => {
        this.setState({
          ...this.state,
          modal: {
            isModalOpen: true
          },
          card: { ...card }
        })
      }

      handleCloseModalClick = () => {
        this.setState({
          ...this.state,
          modal: {
            isModalOpen: false
          },
          card: {}
        })
      }

      handleCloseModal = () => {
        this.setState({
          ...this.state,
          modal: {
            isModalOpen: false
          },
          card: {}
        })
      }

      renderModal() {
        if (!this.state.modal.isModalOpen) {
          return null
        }
        const { card } = this.state
        return (
          <div>
            <h3>{card.name}</h3>
            <hr />
            Email: {card.email} <br />
            Username: {card.username} <br />
            Website: {card.website} <br />
            <hr />
            <h4>Address</h4>
            {card.company.name} <br />
            {card.address.street} <br />
            {card.address.suite} <br />
            {card.address.city} <br />
            {card.address.zipcode} <br />
          </div>
        )
      }

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
                            <ProductCard
                              item={item}
                              handleClick={() => this.handleModalClick(item)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Segment>
            <Modal
              closeTimeoutMS={150}
              isOpen={this.state.modal.isModalOpen}
              onRequestClose={this.handleCloseModal}
              style={{
                // the below styles are just quick hacks for testing purposes only
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: '1000'
                },
                content: {
                  top: 'unset',
                  left: 'unset',
                  right: 'unset',
                  bottom: 'unset',
                  width: '50vw',
                  height: '50vh'
                }
              }}
            >
              {this.renderModal()}
            </Modal>
          </DragDropContext>
        )
      }
    }
  )
)

export default List
