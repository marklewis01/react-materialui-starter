const port = 3001

// represents a delayed api response
export const fetchAllCaps = text => {
  return new Promise(res => {
    setTimeout(() => res(text.toUpperCase()), 1000)
  })
}

export function fetchTodos() {
  return fetch(`http://localhost:${port}/todos`)
    .then((response) => response.json())
    .catch(e => e.json())
}

export function addTodo(todo) {
  return fetch(`http://localhost:${port}/todos`, {
    body: JSON.stringify({
      text: todo.text
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

export function deleteTodo(id) {
  return fetch(`http://localhost:${port}/todos/${id}`, {
    method: 'DELETE'
  }).then(response => {
    if (response.status !== 200) {
      throw Error(response.statusText)
    }
  })
}

export function toggleTodo(todo) {
  return fetch(`http://localhost:${port}/todos/${todo._id}`, {
    body: JSON.stringify({
      complete: !todo.complete
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  }).then(response => {
    if (response.status !== 200) {
      throw Error(response.statusText)
    }
  })
}
