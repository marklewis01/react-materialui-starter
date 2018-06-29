import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { auth } from '../helpers'
import * as routes from '../routes'

// material-ui components
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import loginPageStyle from '../assets/jss/loginPage.jsx'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  cardAnimaton: 'cardHidden',
  email: '',
  password: '',
  error: null
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    // we use this to make the card to appear after the page has been rendered
    this.state = { ...INITIAL_STATE }
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: '' })
      }.bind(this),
      700
    )
  }

  onSubmit = event => {
    const { email, password } = this.state

    const { history } = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.DASHBOARD)
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { classes } = this.props
    const { email, password } = this.state

    return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i
                          className={classes.socialIcons + ' fab fa-twitter'}
                        />
                      </Button>
                      <Button
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i
                          className={classes.socialIcons + ' fab fa-facebook'}
                        />
                      </Button>
                      <Button
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i
                          className={
                            classes.socialIcons + ' fab fa-google-plus-g'
                          }
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardContent>
                    <input
                      value={email}
                      onChange={event =>
                        this.setState(
                          updateByPropertyName('email', event.target.value)
                        )
                      }
                      type="text"
                      placeholder="Email Address"
                      autoComplete="email"
                    />
                    <input
                      value={password}
                      onChange={event =>
                        this.setState(
                          updateByPropertyName('password', event.target.value)
                        )
                      }
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </CardContent>
                </form>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(loginPageStyle)(LoginPage)
