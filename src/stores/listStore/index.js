import { action, computed, decorate, observable } from 'mobx'

import { fetchSomeInfo } from '../../utils/api'

const storageKey = 'theRemoteList'

class ListStore {
  constructor() {
    this.result = [] // observable
    this.loading = false // observable
    this.cached = null // observable
  }

  get cachedTime() {
    return new Date(this.cached).toTimeString()
  }

  resultNotCached = () => {
    return this.result.length === 0 // needs to return true for fetch to trigger
  }

  onPageLoad = () => {
    // const timestamp = Date.now()
    // const expiredCache = timestamp - 60 // 1 min cache for demo purposes
    const cachedList = sessionStorage.getItem(storageKey)

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
      .then(() => this.setResult(resultArray))
  }

  setResult = resultArray => {
    const time = new Date()
    // const timestamp = new Intl.DateTimeFormat('en-GB', {
    //   year: 'numeric',
    //   month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit'
    // }).format(time)

    sessionStorage.setItem(
      storageKey,
      JSON.stringify({
        timestamp: time,
        data: resultArray
      })
    )
    this.result = resultArray
    this.loading = false
    this.cached = time
  }

  clearCache = () => {
    sessionStorage.clear('theRemoteList')
    // also clear data from store
    this.result = []
    this.cached = null
  }
}
decorate(ListStore, {
  cached: observable,
  cachedTime: computed,
  fetchInfo: action,
  loading: observable,
  result: observable
})

const listStore = new ListStore()

export default listStore
