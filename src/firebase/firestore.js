import { firestore } from './firebase'

// User API

export const doCreateUser = (id, familyName, givenName, email) => {
  console.log('firestore called', id)
  firestore
    .collection('users')
    .doc(id)
    .set({
      email: email,
      familyName: familyName,
      givenName: givenName
    })
}
