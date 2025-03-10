// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "boier-biddan.firebaseapp.com",
    projectId: "boier-biddan",
    storageBucket: "boier-biddan.firebasestorage.app",
    messagingSenderId: "406708533376",
    appId: "1:406708533376:web:8f662af5250788e7df4e65",
    measurementId: "G-9SL7QNPQ6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);