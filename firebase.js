// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-1SBMMTmi4bphPBdo-U91UhAd28l2ONc",
  authDomain: "mastermind-5c5dd.firebaseapp.com",
  projectId: "mastermind-5c5dd",
  storageBucket: "mastermind-5c5dd.appspot.com",
  messagingSenderId: "585765796137",
  appId: "1:585765796137:web:df7f1d757371dde5f09f38",
  measurementId: "G-4N59N7BFYT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
