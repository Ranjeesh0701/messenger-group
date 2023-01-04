import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuXZbFe3Nj4M3QTYzx5ndA6voYp--Qcy4",
  authDomain: "messenger-clone-4394a.firebaseapp.com",
  projectId: "messenger-clone-4394a",
  storageBucket: "messenger-clone-4394a.appspot.com",
  messagingSenderId: "570293547759",
  appId: "1:570293547759:web:0d43706664b1cad5e6e11a",
  measurementId: "G-BPG3SEB5NN",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
