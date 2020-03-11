import * as firebase from "firebase";

const prodConfig = {
  apiKey: "your apiKey",
  authDomain: "your authDomain",
  databaseURL: "your databaseURL",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId"
};

const devConfig = {
  apiKey: "your apiKey",
  authDomain: "your authDomain",
  databaseURL: "your databaseURL",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
export const firebaseAuth = firebase.auth;

export const db = firebase.firestore();
// db.settings({ timestampsInSnapshots: true })
