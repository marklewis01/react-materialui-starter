import React, { Component } from 'react'
import { Button, TextField, withStyles } from '@material-ui/core'

import { firebaseAuth, firebaseDb } from '../../firebase'

const styles = theme => ({
  dateField: {
    margin: theme.spacing.unit,
    width: 150
  },
  form: {
    marginBottom: `1rem`
  },
  textField: {
    width: 250
  }
})

// const userId = firebase.auth.currentUser.uid
// const colRef = firebase.db
//   .collection('todos')
//   .doc(userId)
//   .collection('tasks')

class AddTodoInput extends Component {
  constructor(props) {
    super(props)

    this.userId = firebaseAuth().currentUser.uid
    this.colRef = firebaseDb()
      .collection('todos')
      .doc(this.userId)
      .collection('tasks')

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

    this.colRef
      .add({
        task: this.state.taskName,
        completed: false,
        due: this.state.dueDate,
        owner: this.userId
      })
      .then(res => {
        this.setState({
          taskName: '',
          dueDate: ''
        })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <form onSubmit={e => this.handleSubmit(e)} className={classes.form}>
        <TextField
          className={classes.textField}
          onChange={e => this.handleChange(e, 'taskName')}
          type="text"
          value={this.state.taskName}
        />
        <TextField
          id="date"
          label="Due Date"
          className={classes.dateField}
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

export default withStyles(styles, { withTheme: true })(AddTodoInput)
