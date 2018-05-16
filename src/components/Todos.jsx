import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Card, Container, Header, Segment } from 'semantic-ui-react'

// import { toggleTodo } from '../utils/api';

const Todos = inject('todoStore')(
  observer(
    class ObserverSpecifications extends React.Component {
      componentDidMount() {
        this.props.todoStore.getTodos()
      }

      toggleItem = todo => {
        console.log(todo)
      }

      render() {
        const { todoStore } = this.props
        return (
          <Container>
            <Header as="h2">Things Todo!</Header>
            <Segment>
              <Header as="h3">Segment Content</Header>

              {todoStore.todos.map(todo => (
                <Card fluid key={todo._id}>
                  <Card.Content>
                    <Card.Header>{todo.text}</Card.Header>
                    <Card.Meta
                      style={{
                        textDecoration: todo.complete ? 'line-through' : 'none'
                      }}
                    />
                    <Card.Description>
                      <p>Card description area</p>
                      <Button
                        basic
                        primary
                        onClick={() => todoStore.toggleTodo(todo)}
                      >
                        Mark Complete
                      </Button>
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

export default Todos
