import { action, computed, decorate, observable } from 'mobx'

import { fetchSomeInfo } from '../../utils/api'

const storageKey = 'theRemoteList'

class ListStore {
  constructor() {
    this.items = [] // observable
    this.loading = false // observable
    this.cached = null // observable
  }

  get cachedTime() {
    return new Date(this.cached).toTimeString()
  }

  itemsNotCached = () => {
    return this.items.length === 0 // needs to return true for fetch to trigger
  }

  onPageLoad = () => {
    const cachedList = sessionStorage.getItem(storageKey)

    if (cachedList) {
      this.items = JSON.parse(cachedList).data
      this.loading = false
      this.cached = JSON.parse(cachedList).timestamp
    } else {
      this.fetchInfo()
    }
  }

  fetchInfo = async () => {
    const itemsArray = []
    const time = new Date()

    // only show loading spinner if fetch takes longer then 300ms
    setTimeout(() => {
      if (this.items.length === 0) {
        this.loading = true
      }
    }, 300)

    await fetchSomeInfo()
      .then(result => {
        return result.map(item => {
          return itemsArray.push(item)
        })
      })
      .then(() => this.setItems(itemsArray, time))
  }

  setItems = (itemsArray, time) => {
    // check if time being passed from fetchInfo, if not, grab from cache
    // allows for setItems to be called by onDragEnd
    if (!time) {
      time = this.cached
    }

    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        timestamp: time,
        data: itemsArray
      })
    )
    this.items = itemsArray
    this.loading = false
    this.cached = time
  }

  clearCache = () => {
    sessionStorage.clear('theRemoteList')
    // also clear data from store
    this.items = []
    this.cached = null
  }
}
decorate(ListStore, {
  cached: observable,
  cachedTime: computed,
  fetchInfo: action,
  loading: observable,
  items: observable
})

const listStore = new ListStore()

export default listStore
