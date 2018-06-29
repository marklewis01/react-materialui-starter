import { firebaseDb } from '../firebase'

// User API
export const doCreateUser = (id, familyName, givenName, email) => {
  const collection = firebaseDb().collection('users')
  return collection.add({
    email: email,
    familyName: familyName,
    givenName: givenName
  })
}

// Create Users
export const createUser = name => {
  const collection = firebaseDb().collection('users')
  return collection.add(name).then(res => console.log(res))
}

// Fetch All Users as array
export const fetchCollection = col => {
  firebaseDb()
    .collection(col)
    .get()
    .then(snapshot => {
      const userArray = []
      snapshot.forEach(doc => userArray.push(doc.data()))
      return userArray
    })
}
