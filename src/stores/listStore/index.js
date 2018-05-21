import { action, decorate, observable } from 'mobx'
// import uiStore from '../uiStore'

import { fetchSomeInfo } from '../../utils/api'

const storageKey = 'theRemoteList'

class ListStore {
  constructor() {
    this.result = [] // observable
    this.loading = false // observable
    this.cached = '' // observable
  }

  resultNotCached = () => {
    return this.result.length === 0 // needs to return true for fetch to trigger
  }

  onPageLoad = () => {
    // const timestamp = Date.now()
    // const expiredCache = timestamp - 60 // 1 min cache for demo purposes
    const cachedList = localStorage.getItem(storageKey)

    if (cachedList) {
      this.result = JSON.parse(cachedList).data
      this.loading = false
      this.cached = JSON.parse(cachedList).timestamp
    } else {
      this.fetchInfo()
    }
  }

  fetchInfo = async () => {
    const resultArray = []

    // only show loading spinner if fetch takes longer then 300ms
    setTimeout(() => {
      if (this.result.length === 0) {
        this.loading = true
      }
    }, 300)

    await fetchSomeInfo()
      .then(result => {
        return result.map(item => {
          return resultArray.push(item)
        })
      })
      .then(() => this.setResult(resultArray, storageKey))
  }

  setResult = (resultArray, storageKey) => {
    const time = new Date()
    const timestamp = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(time)

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        timestamp: timestamp,
        data: resultArray
      })
    )
    this.result = resultArray
    this.loading = false
    this.cached = timestamp
  }

  clearCache = () => {
    localStorage.clear('theRemoteList')
    // also clear data from store
    this.result = []
    this.cached = ''
  }
}
decorate(ListStore, {
  cached: observable,
  fetchInfo: action,
  loading: observable,
  result: observable
})

const listStore = new ListStore()

export default listStore
