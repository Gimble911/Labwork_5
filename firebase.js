import firebase from "firebase/compat";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAvSZICRwsmKFgJX04gm4N41l5INvwetw",
  authDomain: "labwork5-da6ad.firebaseapp.com",
  projectId: "labwork5-da6ad",
  storageBucket: "labwork5-da6ad.appspot.com",
  messagingSenderId: "526406101550",
  appId: "1:526406101550:web:bec2180a23aa9a8ae64dbf"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const dp = app.firestore();
const auth = firebase.auth();

export { dp, auth };
