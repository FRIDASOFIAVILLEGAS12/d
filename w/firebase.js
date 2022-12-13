// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi4KK3wmUCPHvJu051StaaXePvEMMt6A0",
  authDomain: "sofi-788db.firebaseapp.com",
  projectId: "sofi-788db",
  storageBucket: "sofi-788db.appspot.com",
  messagingSenderId: "681345867936",
  appId: "1:681345867936:web:44fdbfae326f2dc7e369c5",
  measurementId: "G-99QCWP8YVP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);