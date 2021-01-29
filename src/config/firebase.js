import firebase from 'firebase';
import 'firebase/database';
  var firebaseConfig = {
    apiKey: "AIzaSyDn7Uf1cv0ywBFcC0PCM8f1dkRvvqz2wfE",
    authDomain: "todo-app-react-70e8f.firebaseapp.com",
    projectId: "todo-app-react-70e8f",
    storageBucket: "todo-app-react-70e8f.appspot.com",
    messagingSenderId: "1019747655677",
    appId: "1:1019747655677:web:dc64b693f591bd1b7d8394",
    measurementId: "G-CLJ30DKLL8"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);