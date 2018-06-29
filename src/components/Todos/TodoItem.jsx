import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Checkbox,
  Divider,
  IconButton,
  Paper,
  TextField
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { firebaseAuth, firebaseDb } from '../../firebase'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    marginLeft: 16,
    width: 40
  },
  input: {
    flex: 1
  },
  icon: {
    marginRight: 6
  }
}

// const userId = firebase.auth.currentUser.uid
// const colRef = firebase.db
//   .collection('todos')
//   .doc(userId)
//   .collection('tasks')

class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.userId = firebaseAuth().currentUser.uid
    this.colRef = firebaseDb()
      .collection('todos')
      .doc(this.userId)
      .collection('tasks')
  }

  static propTypes = {
    todo: PropTypes.any
  }

  handleToggleComplete = (e, id) => {
    const completed = e.target.checked
    this.colRef.doc(id).update({ completed: completed })
  }

  handleTodoUpdate = (e, id) => {
    this.colRef.doc(id).update({
      task: e.target.value
    })
  }

  handleDelete = async id => {
    this.colRef.doc(id).delete()
  }

  render() {
    const { todo } = this.props
    const { completed, task, id } = todo

    return (
      <Paper elevation={1}>
        <div style={styles.row}>
          <Checkbox
            disableRipple
            checked={completed}
            color="primary"
            style={styles.checkbox}
            onClick={e => this.handleToggleComplete(e, id)}
          />
          <TextField
            id={todo.id}
            style={styles.input}
            InputProps={{
              disableUnderline: true
            }}
            onChange={e => this.handleTodoUpdate(e, todo.id)}
            value={task}
          />
          <IconButton
            aria-label="Delete"
            style={styles.icon}
            color="secondary"
            onClick={() => this.handleDelete(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <Divider />
      </Paper>
    )
  }
}

export default TodoItem
