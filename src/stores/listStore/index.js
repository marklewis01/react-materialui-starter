import { action, decorate, observable } from 'mobx'
// import uiStore from '../uiStore'

import { fetchSomeInfo } from '../../utils/api'

class ListStore {
  constructor() {
    this.text = '' // observable
    this.list = [] // observable
    this.loading = false // observable
  }

  async fetchInfo() {
    this.list = []
    // only show loading spinner if fetch takes longer then 400ms
    setTimeout(() => {
      if (this.list.length === 0) {
        this.loading = true
      }
    }, 500)
    await fetchSomeInfo()
      .then(resp => {
        resp.map(obj => this.list.push(obj))
      })
      .then(() => (this.loading = false))
  }
}
decorate(ListStore, {
  fetchInfo: action,
  text: observable,
  list: observable,
  loading: observable
})

const listStore = new ListStore()

export default listStore
export { ListStore }
