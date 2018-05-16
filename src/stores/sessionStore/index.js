import { action, decorate } from 'mobx'

class SessionStore {
  constructor() {
    this.session = null
    this.user = null
  }

  reset = () => {
    this.session = null
    this.user = null
  }

  setMe = me => {
    this.user = me
  }

  setSession = session => {
    this.session = session
  }
}
decorate(SessionStore, {
  reset: action,
  setMe: action,
  setSession: action
})

const sessionStore = new SessionStore()

export default sessionStore
export { SessionStore }
