// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_kEY,
  authDomain: "munch-app-45785.firebaseapp.com",
  projectId: "munch-app-45785",
  storageBucket: "munch-app-45785.firebasestorage.app",
  messagingSenderId: "167961984491",
  appId: "1:167961984491:web:09b5485c9e1c74f7b8edae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)