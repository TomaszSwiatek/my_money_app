import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from './firebaseConfig'




// init firebase
firebase.initializeApp(firebaseConfig)
// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// create a timestamp:
const timestamp = firebase.firestore.Timestamp  // returns a function
export { projectFirestore, projectAuth, timestamp }