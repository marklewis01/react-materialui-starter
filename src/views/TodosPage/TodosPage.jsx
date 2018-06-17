import React from 'react'
import PropTypes from 'prop-types'
import { Subscribe } from 'unstated'

import {
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { firebase } from '../../firebase'
import SessionContainer from '../../containers/session'
import withAuthorization from '../../components/Session/withAuthorization'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class TodosPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dueDate: '',
      taskName: '',
      todos: null
    }
  }

  componentDidMount() {
    firebase.db.collection('todos').onSnapshot(collection => {
      const todos = collection.docs.map(doc => ({
        id: doc.id,
        task: doc.data().task,
        due: doc.data().due,
        completed: doc.data().completed
      }))
      this.setState({ todos })
    })
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

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value })
  }

  handleToggleComplete = (e, id) => {
    const completed = e.target.checked
    firebase.db
      .collection('todos')
      .doc(id)
      .update({ completed: completed })
  }

  handleDelete = id => {
    firebase.db
      .collection('todos')
      .doc(id)
      .delete()
  }

  render() {
    const { classes } = this.props

    return (
      <Subscribe to={[SessionContainer]}>
        {session => (
          <Paper>
            <Grid container>
              <Grid item>
                <Typography variant="display1">My Todo List:</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
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
                    className={classes.textField}
                    onChange={e => this.handleChange(e, 'dueDate')}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <button type="submit" disabled={this.state.taskName === ''}>
                    Add Task
                  </button>
                </form>
              </Grid>
              <Grid container>
                <List>
                  {this.state.todos &&
                    this.state.todos.map(todo => (
                      <ListItem key={todo.id}>
                        <Checkbox
                          checked={todo.completed}
                          disableRipple
                          onClick={e => this.handleToggleComplete(e, todo.id)}
                        />
                        <ListItemText
                          primary={todo.task}
                          secondary={`Due: ${todo.due}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => this.handleDelete(todo.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Subscribe>
    )
  }
}

TodosPage.propTypes = {
  classes: PropTypes.object.isRequired
}

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(
  withStyles(styles, { withTheme: true })(TodosPage)
)
