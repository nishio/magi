// firestore settings
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3uLtmooecyWI4WnHq0jBhf36XdxHa2so",
  authDomain: "plural-viewpoints.firebaseapp.com",
  projectId: "plural-viewpoints",
  storageBucket: "plural-viewpoints.appspot.com",
  messagingSenderId: "1087194259490",
  appId: "1:1087194259490:web:aad5aa703f07d581ea2a7b",
  measurementId: "G-8ZV89P2ZTD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
