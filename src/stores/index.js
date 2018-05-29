import { configure } from 'mobx'

// import ListStore from './listStore'
import SessionStore from './sessionStore'
import UiStore from './uiStore'
import UserStore from './userStore'

configure({ enforceActions: true })

class RootStore {
  constructor() {
    // this.listStore = new ListStore(this)
    this.sessionStore = new SessionStore(this)
    this.uiStore = new UiStore(this)
    this.userStore = new UserStore(this)
  }
}

const rootStore = new RootStore()

export default rootStore

// export { sessionStore, listStore, uiStore }
