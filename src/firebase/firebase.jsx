// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANK5EqUVDdDAupBMpYWotGRaJK-CJNbJw",
  authDomain: "daily-planner-7e364.firebaseapp.com",
  projectId: "daily-planner-7e364",
  storageBucket: "daily-planner-7e364.firebasestorage.app",
  messagingSenderId: "543166557016",
  appId: "1:543166557016:web:9e6b184441654e7d87932d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);