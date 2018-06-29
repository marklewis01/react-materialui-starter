import { firebaseAuth } from '../firebase'

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  firebaseAuth().createUserWithEmailAndPassword(email, password)

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  firebaseAuth().signInWithEmailAndPassword(email, password)

// Sign out
export const doSignOut = () => firebaseAuth().signOut()

// Password Reset
export const doPasswordReset = email =>
  firebaseAuth().sendPasswordResetEmail(email)

// Password Change
export const doPasswordUpdate = password =>
  firebaseAuth().currentUser.updatePassword(password)
