// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7uIqok2jmbdHdY6NGM3xsz6OZ0UOpaiw",
  authDomain: "myeventapp-e6325.firebaseapp.com",
  projectId: "myeventapp-e6325",
  storageBucket: "myeventapp-e6325.appspot.com",
  messagingSenderId: "381668348461",
  appId: "1:381668348461:web:7e90d9d020938e9e7cdea4",
  measurementId: "G-W3MY0JS65M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, auth };
