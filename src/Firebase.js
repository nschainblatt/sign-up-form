import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIYrgvEv14Oy4fkxlzmdr5ylLTOaMCcEU",
  authDomain: "nschainblatt-signup-form.firebaseapp.com",
  databaseURL: "https://nschainblatt-signup-form-default-rtdb.firebaseio.com",
  projectId: "nschainblatt-signup-form",
  storageBucket: "nschainblatt-signup-form.appspot.com",
  messagingSenderId: "756965870734",
  appId: "1:756965870734:web:f1b7b76048053c1744cddf",
  measurementId: "G-E5FEM76CZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

// db.on('value', (snapshot) => {
//     console.log(snapshot.val());
//   }, (errorObject) => {
//     console.log('The read failed: ' + errorObject.name);
//   });

export default db;
