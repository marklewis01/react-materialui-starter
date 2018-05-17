export function fetchSomeInfo() {
  // random api for testing/demo purposes only
  return fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(response => response.json())
    .catch(e => e.json())
}
