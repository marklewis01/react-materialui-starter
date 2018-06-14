import * as firebase from 'firebase'

const config = {
  apiKey: 'your apiKey',
  authDomain: 'your authDomain',
  databaseURL: 'your databaseURL',
  projectId: 'your projectId',
  storageBucket: 'your storageBucket',
  messagingSenderId: 'your messagingSenderId'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const firestore = firebase.firestore()

export { auth, firestore }
