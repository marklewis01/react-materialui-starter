import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import { CircularProgress } from '@material-ui/core'

import { firebaseAuth, firebaseDb } from '../../firebase'
import TodoItem from './TodoItem'

class Todos extends Component {
  constructor(props) {
    super(props)

    this.userId = firebaseAuth().currentUser.uid
    this.colRef = firebaseDb()
      .collection('todos')
      .doc(this.userId)
      .collection('tasks')
    this.unsubscribe = null

    this.state = {
      dueDate: '',
      loading: true,
      taskName: '',
      todos: []
    }
  }

  componentDidMount() {
    firebaseDb()
      .collection('todos')
      .doc(this.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          this.unsubscribe = this.colRef
            .orderBy('due', 'asc')
            .onSnapshot(this.onCollectionUpdate)
        } else {
          firebaseDb()
            .collection('todos')
            .doc(this.userId)
            .set({ owner: this.userId })
            .then(() => {
              this.unsubscribe = this.colRef
                .orderBy('due', 'asc')
                .onSnapshot(this.onCollectionUpdate)
            })
        }
      })
  }

  onCollectionUpdate = querySnapshot => {
    const todos = []

    querySnapshot.forEach(doc => {
      const { completed, due, task } = doc.data()
      const id = doc.id

      todos.push({
        completed,
        due,
        id,
        task
      })
    })

    this.setState({
      todos,
      loading: false
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { todos } = this.state
    const children = todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
    const { isLoading } = todos

    return (
      <div>
        <FlipMove>{children}</FlipMove>
        {isLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          undefined
        )}
      </div>
    )
  }
}

export default Todos
