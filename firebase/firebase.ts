// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCd3ou6BgFF5_xiLUqw9DUajqlXIzhaiQE",
    authDomain: "twilight-luxe-creations-d9864.firebaseapp.com",
    projectId: "twilight-luxe-creations-d9864",
    storageBucket: "twilight-luxe-creations-d9864.firebasestorage.app",
    messagingSenderId: "443783303819",
    appId: "1:443783303819:web:d7a4b9b7611e436c2f3a8e",
    measurementId: "G-J9QNB8S3GW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)