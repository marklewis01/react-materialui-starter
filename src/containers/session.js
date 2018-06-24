import { Container } from 'unstated'
import { auth } from '../firebase'

class SessionContainer extends Container {
  state = {
    authUser: null
  }

  setAuthUser = authUser => {
    const avatarLetter = authUser.email.charAt(0).toUpperCase()
    this.setState({
      authUser: {
        ...authUser,
        avatarLetter
      }
    })
  }

  handleSignOut = () => {
    auth
      .doSignOut()
      .then(window.location.reload())
      .catch(error => {
        console.log('error:', error)
      })
  }
}

const sessionContainer = new SessionContainer()

export default sessionContainer
