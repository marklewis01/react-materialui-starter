import { action, decorate, observable } from 'mobx'
import { toast } from 'react-toastify'

class Alert {
  constructor(message) {
    this.message = `This alert has been added and called to/from the MobX uiStore. ${message}`
    this.acknowleged = false
    this.autoClose = false
  }
}
decorate(Alert, {
  message: observable,
  acknowleged: observable
})

class UiStore {
  constructor() {
    this.loading = false
    this.sidebarVisible = false
    this.alerts = []
  }

  sidebarToggleVisibility = () => {
    this.sidebarVisible = !this.sidebarVisible
  }

  createAlert(message) {
    this.alerts.push(new Alert(message))
    toast(this.alerts[this.alerts.length - 1].message)
  }
}
decorate(UiStore, {
  loading: observable,
  sidebarVisible: observable,
  createAlert: action
})

const uiStore = new UiStore()

export default uiStore
export { UiStore }
