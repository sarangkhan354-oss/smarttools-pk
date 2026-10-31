// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDH89jwJkrLU9VxnvJBIC9KL5YeGqaYXU",
  authDomain: "smarttools-pk.firebaseapp.com",
  projectId: "smarttools-pk",
  storageBucket: "smarttools-pk.firebasestorage.app",
  messagingSenderId: "314254867936",
  appId: "1:314254867936:web:0132677bba461be9587f85",
  measurementId: "G-BHECK5FYF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
