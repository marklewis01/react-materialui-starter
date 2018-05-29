// import { configure } from 'mobx'

// import ListStore from './listStore'
import sessionStore from './sessionStore'
import uiStore from './uiStore'
import userStore from './userStore'

// configure({ enforceActions: true })

// class RootStore {
//   constructor() {
//     // this.listStore = new ListStore(this)
//     this.sessionStore = new SessionStore(this)
//     this.uiStore = new UiStore(this)
//     this.userStore = new UserStore(this)
//   }
// }

// const rootStore = new RootStore()

// export default rootStore

export { sessionStore, uiStore, userStore }
