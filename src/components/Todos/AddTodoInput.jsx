import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'

import { firebase } from '../../firebase'

class AddTodoInput extends Component {
  constructor(props) {
    super(props)

    this.ref = firebase.db.collection('todos')

    this.state = {
      dueDate: '',
      taskName: ''
    }
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    firebase.db
      .collection('todos')
      .add({
        task: this.state.taskName,
        completed: false,
        due: this.state.dueDate
      })
      .then(res => {
        this.setState({
          taskName: '',
          dueDate: ''
        })
      })
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <TextField
          onChange={e => this.handleChange(e, 'taskName')}
          type="text"
          value={this.state.taskName}
        />
        <TextField
          id="date"
          label="Due Date"
          type="date"
          value={this.state.dueDate}
          onChange={e => this.handleChange(e, 'dueDate')}
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button type="submit" disabled={this.state.taskName === ''}>
          Add Task
        </Button>
      </form>
    )
  }
}

export default AddTodoInput
