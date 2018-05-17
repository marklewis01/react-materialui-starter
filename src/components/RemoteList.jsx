import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Container, Header, Segment } from 'semantic-ui-react'

const List = inject('listStore')(
  observer(
    class ObserverSpecifications extends React.Component {
      componentDidMount() {
        this.props.listStore.fetchInfo()
      }

      render() {
        const { listStore } = this.props
        return (
          <Container>
            <Header as="h2">Remote Content</Header>
            <Segment>
              <Header as="h3">Segment Content</Header>
              <p>The cards/data below are fetched from a remote location.</p>

              {listStore.list.map(list => (
                <Card fluid key={list.id}>
                  <Card.Content>
                    <Card.Header>{list.name}</Card.Header>
                    <Card.Meta>{list.company.name}</Card.Meta>
                    <Card.Description>
                      <p>{list.address.street}</p>
                      <p>{list.address.city}</p>
                      <p>{list.address.zipcode}</p>
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Segment>
          </Container>
        )
      }
    }
  )
)

export default List
