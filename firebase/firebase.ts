// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB2h00t4vs990tRBD5435EyCcla4ovbN0o",
    authDomain: "twilight-luxe-creations.firebaseapp.com",
    projectId: "twilight-luxe-creations",
    storageBucket: "twilight-luxe-creations.firebasestorage.app",
    messagingSenderId: "235817647528",
    appId: "1:235817647528:web:5ef24d27e51d755690f19d",
    measurementId: "G-MNR7F2KEN0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)