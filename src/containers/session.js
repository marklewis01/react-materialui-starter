import { Container } from 'unstated'

class SessionContainer extends Container {
  state = {
    authUser: null
  }

  setAuthUser = authUser => {
    this.setState({
      authUser
    })
  }
}

const sessionContainer = new SessionContainer()

export default sessionContainer
