import { Container } from 'unstated'

class SessionContainer extends Container {
  state = {
    authUser: null,
    count: 0
  }

  setAuthUser = authUser => {
    this.setState({
      authUser
    })
  }

  increment = () => {
    this.setState(state => {
      return { count: state.count + 1 }
    })
  }
}

const sessionContainer = new SessionContainer()

export default sessionContainer
