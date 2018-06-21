import React from 'react'
import {
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core'

import { Actions, Team } from './index'
import { firebase } from '../../firebase'

const styles = theme => ({
  gridItemFlex: {
    display: 'flex'
  },
  gridItem: {
    paddingTop: 0
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.primary.light}`
  }
})

class Organisation extends React.Component {
  constructor(props) {
    super(props)
    this.userId = firebase.auth.currentUser.uid
    this.colRef = firebase.db.collection('users').doc(this.userId)
    this.unsubscribe = null

    this.state = {
      org: {
        name: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        logo: {},
        website: '',
        team: [],
        auditLog: []
      },
      loading: true
    }
  }

  componentDidMount() {
    this.colRef.get().then(doc => {
      if (doc.data().org) {
        this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate)
      } else {
        this.colRef
          .update({ owner: this.userId })
          .then(() => {
            this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate)
          })
          .then(() =>
            this.colRef.update({
              org: { team: [this.userId] }
            })
          )
      }
    })
  }

  onCollectionUpdate = doc => {
    this.setState({
      ...doc.data(),
      loading: false
    })
  }

  handleChange = name => event => {
    this.colRef.update({
      [name]: event.target.value
    })
  }

  componentWillUnmount() {
    this.subscibe ? this.unsubscribe() : null
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="title">Organisation Location</Typography>
            <form>
              <Grid container spacing={24} justify="space-between">
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    label="Organisation Name"
                    value={this.state.org.name}
                    onChange={this.handleChange('org.name')}
                    margin="normal"
                    fullWidth
                    autoComplete="organization"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    label="Street Address"
                    multiline={true}
                    value={this.state.org.address}
                    onChange={this.handleChange('org.address')}
                    margin="normal"
                    fullWidth
                    autoComplete="street-address"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="City / Suburb"
                    label="City"
                    fullWidth
                    value={this.state.org.city}
                    onChange={this.handleChange('org.city')}
                    margin="normal"
                    autoComplete="address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="State"
                    label="State"
                    fullWidth
                    value={this.state.org.state}
                    onChange={this.handleChange('org.state')}
                    margin="normal"
                    autoComplete="address-level1"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="Zip"
                    label="Post Code"
                    fullWidth
                    value={this.state.org.zip}
                    onChange={this.handleChange('org.zip')}
                    margin="normal"
                    autoComplete="postal-code"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="website"
                    label="Website"
                    className={classes.textField}
                    value={this.state.org.website}
                    onChange={this.handleChange('org.website')}
                    margin="normal"
                    fullWidth
                    autoComplete="url"
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Actions />
          </Paper>
          <Paper className={classes.paper}>
            <Team />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Organisation)
