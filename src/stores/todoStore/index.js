import { action, computed, decorate, observable } from 'mobx'
import uiStore from '../uiStore'

import { addTodo, fetchTodos, fetchAllCaps, toggleTodo } from '../../utils/api'

class TodoStore {
  constructor() {
    this.text = '' // observable
    this.todos = [] // observable
  }

  async getTodos() {
    this.todos = []
    // only show loading spinner if fetch takes longer then 400ms
    setTimeout(() => {
      if (this.todos.length === 0) {
        uiStore.loading = true
      }
    }, 500);
    await fetchTodos()
      .then(resp => {
        resp.todos.map(todo => this.todos.push(todo))
      })
      .then(() => (uiStore.loading = false))
  }

  get todosCount() {
    return this.todos.length
  }

  toggleTodo = (todo) => {
    console.log('clicked')
    toggleTodo(todo)
      .then(() => this.getTodos())
  }


  onChange = e => {
    this.text = e.target.value
    // represent async api call
    fetchAllCaps(e.target.value).then(val => (this.text = val))
  }

  addItem = e => {
    const data = {
      text: e
    }
    // console.log('Sending to api/db', data)
    addTodo(data) //no ack functionality currently
      .then(doc => doc.json())
      .then(doc => {
        // console.log(doc)
        this.todos.push(doc)
      })
  }
}
decorate(TodoStore, {
  getTodos: action,
  text: observable,
  todos: observable,
  todosCount: computed,
  toggleTodo: action
})

const todoStore = new TodoStore()

export default todoStore
export { TodoStore }
