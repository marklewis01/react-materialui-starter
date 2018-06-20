import { Container } from 'unstated'

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
}

const sessionContainer = new SessionContainer()

export default sessionContainer
