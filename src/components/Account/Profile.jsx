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

import { LastLogin } from './index'
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
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    marginBottom: theme.spacing.unit * 3
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

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.userId = firebase.auth.currentUser.uid
    this.colRef = firebase.db.collection('users').doc(this.userId)
    this.unsubscribe = null

    this.state = {
      email: '',
      givenName: '',
      familyName: '',
      organisationId: '',
      profilePic: '',
      auditLog: [],
      loading: true
    }
  }

  // componentDidMount() {
  //   this.colRef.get().then(doc => {
  //     if (doc.exists) {
  //       this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate)
  //     } else {
  //       this.colRef.set({ owner: this.userId }).then(() => {
  //         this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate)
  //       })
  //     }
  //   })
  // }

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

  // componentWillUnmount() {
  //   this.subscibe ? this.unsubscribe() : null
  // }

  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="title">Personal Information</Typography>
            <form>
              <Grid container justify="space-between">
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="givenName"
                    label="Given Name"
                    className={classes.textField}
                    value={this.state.givenName}
                    onChange={this.handleChange('givenName')}
                    margin="normal"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="familyName"
                    label="Family Name"
                    multiline={true}
                    value={this.state.familyName}
                    onChange={this.handleChange('familyName')}
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    label="Email Address"
                    multiline={true}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography variant="title">Profile Picture</Typography>
          </Paper>
          <Tabs value={false} className={classes.tabs}>
            <Tab label="Other Information" />
          </Tabs>
          <LastLogin />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Profile)
