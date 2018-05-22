import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Segment
} from 'semantic-ui-react'
import Modal from 'react-modal'

import './List.css'

Modal.setAppElement('#root')

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

      renderCards() {
        const { listStore } = this.props
        return listStore.result.map(list => (
          <Card fluid key={list.id} onClick={() => this.handleModalClick(list)}>
            <Label corner="right">
              <Icon name="plus" />
            </Label>
            <Card.Content>
              <Card.Header>{list.name}</Card.Header>
              <Card.Meta>{list.company.name}</Card.Meta>
              <Card.Description>
                <p>{list.address.street}</p>
              </Card.Description>
            </Card.Content>
          </Card>
        ))
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

      render() {
        const { listStore } = this.props

        const loading = listStore.loading ? (
          <Segment>
            <Loader active content="Fetching remote data" />
            <Image src="/assets/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null

        const cachedButton = listStore.cached ? (
          <Button fluid onClick={listStore.clearCache}>
            Clear Session Cache
          </Button>
        ) : (
          <Button fluid onClick={listStore.fetchInfo}>
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
          <Fragment>
            <Grid>
              <Grid.Column floated="left" width={12}>
                {header}
              </Grid.Column>
              <Grid.Column floated="right" width={4}>
                {cachedButton}
              </Grid.Column>
            </Grid>
            <Segment>
              <div className="list-content-intro">
                <Grid>
                  <Grid.Column width={8}>
                    The cards/data below are fetched from a remote location.
                    <br />
                    Click the cards for even more contact information.
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={8}>
                    <span>Data fetched at: {listStore.cached}</span>
                  </Grid.Column>
                </Grid>
              </div>
              <div className="remote-cards">
                {loading}
                {this.renderCards()}
              </div>
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
          </Fragment>
        )
      }
    }
  )
)

export default List
