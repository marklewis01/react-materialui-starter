import { action, decorate, observable } from 'mobx'

class SessionStore {
  authUser = null

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  setAuthUser = authUser => {
    this.authUser = authUser
  }
}
decorate(SessionStore, {
  authUser: observable,
  setAuthUser: action
})

const sessionStore = new SessionStore()

export default sessionStore
