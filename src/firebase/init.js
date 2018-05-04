// Initialize Firebase
import firebase from 'firebase'
import firestore from 'firebase/firestore'

let config = {
  apiKey: "AIzaSyBGXGuarqrWq3jGVA44Jf63ZuU4JCliVig",
  authDomain: "vue-smoothies.firebaseapp.com",
  databaseURL: "https://vue-smoothies.firebaseio.com",
  projectId: "vue-smoothies",
  storageBucket: "vue-smoothies.appspot.com",
  messagingSenderId: "761402470166"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots : true});

// export firestore database
export default firebaseApp.firestore()
