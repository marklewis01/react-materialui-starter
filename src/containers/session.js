import { Container } from 'unstated'
import { auth } from '../helpers'

class SessionContainer extends Container {
  state = {
    authUser: null
  }

  signInUser = authUser => {
    return new Promise(resolve => {
      resolve(
        this.setState({
          authUser: {
            ...authUser
          }
        })
      )
    })
  }

  signOutUser = () => {
    return new Promise(resolve => {
      resolve(
        auth.doSignOut().then(() => {
          this.setState({
            authUser: null
          })
        })
      )
    })
  }
}

const sessionContainer = new SessionContainer()

export default sessionContainer
