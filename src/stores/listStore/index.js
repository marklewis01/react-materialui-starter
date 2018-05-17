import { action, decorate, observable } from 'mobx'
import uiStore from '../uiStore'

import { fetchSomeInfo } from '../../utils/api'

class ListStore {
  constructor() {
    this.text = '' // observable
    this.list = [] // observable
  }

  async fetchInfo() {
    this.list = []
    // only show loading spinner if fetch takes longer then 400ms
    setTimeout(() => {
      if (this.list.length === 0) {
        uiStore.loading = true
      }
    }, 500)
    await fetchSomeInfo()
      .then(resp => {
        resp.map(obj => this.list.push(obj))
      })
      .then(() => (uiStore.loading = false))
  }
}
decorate(ListStore, {
  fetchInfo: action,
  text: observable,
  list: observable
})

const listStore = new ListStore()

export default listStore
export { ListStore }
