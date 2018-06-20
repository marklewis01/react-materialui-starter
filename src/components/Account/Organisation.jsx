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
  },
  textField: {
    marginRight: theme.spacing.unit * 2,
    flexGrow: 1
  },
  textFieldShort: {
    width: `160px`,
    marginRight: theme.spacing.unit * 2
  }
})

class Organisation extends React.Component {
  constructor(props) {
    super(props)
    this.userId = firebase.auth.currentUser.uid
    this.colRef = firebase.db.collection('users').doc(this.userId)
    this.unsubscribe = null

    this.state = {
      name: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      logo: {},
      website: '',
      team: [],
      auditLog: [],
      loading: true
    }
  }

  componentDidMount() {
    this.colRef.get().then(doc => {
      if (doc.exists) {
        this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate)
      } else {
        this.colRef.set({ owner: this.userId }).then(() => {
          this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate)
        })
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
    this.unsubscribe()
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="title">Organisation Location</Typography>
            <form>
              <Grid container justify="space-between">
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    label="Organisation Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    fullWidth
                    autoComplete="organization"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address"
                    label="Street Address"
                    multiline
                    value={this.state.address}
                    onChange={this.handleChange('address')}
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    autoComplete="street-address"
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridItemFlex}>
                  <TextField
                    id="City / Suburb"
                    label="City"
                    className={classes.textField}
                    value={this.state.city}
                    onChange={this.handleChange('city')}
                    margin="normal"
                    autoComplete="address-level2"
                  />
                  <TextField
                    id="State"
                    label="State"
                    className={classes.textFieldShort}
                    value={this.state.state}
                    onChange={this.handleChange('state')}
                    margin="normal"
                    autoComplete="address-level1"
                  />

                  <TextField
                    id="Zip"
                    label="ZIP / Postal Code"
                    className={classes.textFieldShort}
                    value={this.state.zip}
                    onChange={this.handleChange('zip')}
                    margin="normal"
                    autoComplete="postal-code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="website"
                    label="Website"
                    className={classes.textField}
                    value={this.state.website}
                    onChange={this.handleChange('website')}
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
          <Tabs value={false} className={classes.tabs}>
            <Tab label="Other Information" />
          </Tabs>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Organisation)
