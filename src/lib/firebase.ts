// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWuy3QsTzGfU958stPaOtU-HeR-BRtK5U",
  authDomain: "rentnrun-c48ab.firebaseapp.com",
  projectId: "rentnrun-c48ab",
  storageBucket: "rentnrun-c48ab.firebasestorage.app",
  messagingSenderId: "457802927054",
  appId: "1:457802927054:web:01d60d702efb3e7a00b99f",
  measurementId: "G-S10E7N9GN0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
