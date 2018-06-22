import { Container } from 'unstated'

class UiContainer extends Container {
  state = {
    navSide: false // default NavSide to hidden/collapsed
  }

  toggleDrawer = () => {
    this.setState(prevState => {
      return {
        navSide: !prevState.navSide
      }
    })
  }

  handleDrawerClose = () => {
    this.setState({
      navSide: false
    })
  }

  handleDrawerOpen = () => {
    this.setState({ navSide: true })
  }
}

const uiContainer = new UiContainer()

export default uiContainer
