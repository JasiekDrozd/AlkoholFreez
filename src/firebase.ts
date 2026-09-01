import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC8VghKRnErJYbrEMUWSTHN40pVCR6F6S0",
  authDomain: "alkoholfreez.firebaseapp.com",
  projectId: "alkoholfreez",
  storageBucket: "alkoholfreez.firebasestorage.app",
  messagingSenderId: "64274038036",
  appId: "1:64274038036:web:2dd8e8c37fbdf285c31601"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence);
