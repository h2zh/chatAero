// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "chataero-1fe06.firebaseapp.com",
  projectId: "chataero-1fe06",
  storageBucket: "chataero-1fe06.appspot.com",
  messagingSenderId: "129148627526",
  appId: "1:129148627526:web:0f765488fd36997789f847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);

// const provider = new GoogleAuthProvider();
export {auth}