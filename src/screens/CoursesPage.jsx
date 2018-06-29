import React from 'react'
import { Subscribe } from 'unstated'

import { Grid, Paper, Typography } from '@material-ui/core'

import { firebaseDb } from '../firebase'
import SessionContainer from '../containers/session'
import withAuthorization from '../components/Session/withAuthorization'

class CoursesPage extends React.Component {
  state = {
    name: '',
    textField: '',
    suggestions: null
  }

  componentDidMount() {
    firebaseDb()
      .doc('courses/online')
      .get()
      .then(doc => this.setState({ name: doc.data().name }))
    firebaseDb()
      .collection('suggestions')
      .onSnapshot(collection => {
        const suggestions = collection.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }))
        this.setState({ suggestions })
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    firebaseDb()
      .collection('suggestions')
      .add({ name: this.state.textField })
      .then()
    this.titleName.value = ''
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ textField: this.titleName.value })
  }

  handleDelete = id => {
    firebaseDb()
      .collection('suggestions')
      .doc(id)
      .delete()
  }

  render() {
    return (
      <Subscribe to={[SessionContainer]}>
        {session => (
          <Paper>
            <Grid container>
              <Grid item>
                <h1>{this.state.name}</h1>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <form
                  onSubmit={e => this.handleSubmit(e)}
                  onChange={e => this.handleChange(e)}
                >
                  <input
                    type="text"
                    ref={input => {
                      this.titleName = input
                    }}
                  />
                  <button type="submit">Submit</button>
                </form>
              </Grid>
              <Grid container>
                <Grid item>
                  <ul>
                    {this.state.suggestions &&
                      this.state.suggestions.map(topic => (
                        <li key={topic.id}>
                          <Typography variant="body1">
                            {topic.name}
                            <button onClick={() => this.handleDelete(topic.id)}>
                              Delete Me
                            </button>
                          </Typography>
                        </li>
                      ))}
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Subscribe>
    )
  }
}

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(CoursesPage)
