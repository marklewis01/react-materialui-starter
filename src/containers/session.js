import { Container } from 'unstated'
import { auth } from '../helpers'

class SessionContainer extends Container {
  state = {
    authUser: null
  }

  signInUser = authUser => {
    return new Promise((resolve, reject) => {
      const avatarLetter = authUser.email.charAt(0).toUpperCase()
      resolve(
        this.setState({
          authUser: {
            ...authUser,
            avatarLetter
          }
        })
      )
    })
  }

  signOutUser = () => {
    return new Promise((resolve, reject) => {
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
