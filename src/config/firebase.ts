// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiM3dgkWx2_h3fvHVhorMytguGOdnuhCI",
  authDomain: "final-6e524.firebaseapp.com",
  databaseURL: "https://final-6e524-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "final-6e524",
  storageBucket: "final-6e524.firebasestorage.app",
  messagingSenderId: "855659516116",
  appId: "1:855659516116:web:faa673112252bbc3676b41",
  measurementId: "G-BHY7CXQ9BB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);