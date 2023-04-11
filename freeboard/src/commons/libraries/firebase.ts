// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJwBwOCAd8sdBxNz4rkdDS4WsR8Ppdq-Y",
  authDomain: "freeboard-e70a0.firebaseapp.com",
  projectId: "freeboard-e70a0",
  storageBucket: "freeboard-e70a0.appspot.com",
  messagingSenderId: "685001050934",
  appId: "1:685001050934:web:e33438d3565dfe84744197",
  measurementId: "G-23FFGD87T5",
};

export const firebaseApp = initializeApp(firebaseConfig);
