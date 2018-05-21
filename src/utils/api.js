export const fetchSomeInfo = async () => {
  // artificially delay call to simulate slow response
  await new Promise(resolve => setTimeout(resolve, 2000))
  // random api for testing/demo purposes only
  return fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(response => response.json())
    .catch(e => e.json())
}
