import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyAKDf2Cjpr8WLo6udvCGBm2cLnDtnH9JBs',
  authDomain: 'material-ui-mobx-starter.firebaseapp.com',
  databaseURL: 'https://material-ui-mobx-starter.firebaseio.com',
  projectId: 'material-ui-mobx-starter',
  storageBucket: 'material-ui-mobx-starter.appspot.com',
  messagingSenderId: '1048467073531'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const firebaseAuth = firebase.auth

export const firebaseDb = firebase.firestore
firebaseDb().settings({ timestampsInSnapshots: true })
