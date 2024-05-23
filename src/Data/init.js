import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9xtp2rsOLxAmdV0RspngytStvmQOocOM",
  authDomain: "first-react-app-f76cd.firebaseapp.com",
  projectId: "first-react-app-f76cd",
  storageBucket: "first-react-app-f76cd.appspot.com",
  messagingSenderId: "674289649234",
  appId: "1:674289649234:web:5789181fd1f26e79b2018b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithEmailPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Email login error:", error);
      throw error; 
    }
  };

export { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailPassword, signInWithEmailAndPassword, createUserWithEmailAndPassword };
export const firestore = getFirestore(app);