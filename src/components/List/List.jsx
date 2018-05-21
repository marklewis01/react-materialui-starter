import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  Card,
  Container,
  Header,
  Image,
  Loader,
  Segment
} from 'semantic-ui-react'
import Modal from 'react-modal'

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
        this.props.listStore.fetchInfo()
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
        return listStore.list.map(list => (
          <Card fluid key={list.id} onClick={() => this.handleModalClick(list)}>
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

        return (
          <Container>
            <Header as="h2">Remote Content</Header>
            <Segment>
              <Header as="h3">Segment Content</Header>
              <p>The cards/data below are fetched from a remote location.</p>
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
          </Container>
        )
      }
    }
  )
)

export default List
