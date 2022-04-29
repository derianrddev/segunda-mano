import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnQbErmhNVW9CbuIQJnQCwcAqHjJN0Tc0",
  authDomain: "segunda-mano-app.firebaseapp.com",
  projectId: "segunda-mano-app",
  storageBucket: "segunda-mano-app.appspot.com",
  messagingSenderId: "480452507510",
  appId: "1:480452507510:web:d17104b1735a07c766ec57"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();
 
const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  storage,
  googleAuthProvider
}