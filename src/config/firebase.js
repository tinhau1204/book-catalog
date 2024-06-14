// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use1
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCv2DOly1MEVpjiIOjWn_g2o2vxxkWaT30",
    authDomain: "book-catalog-9f666.firebaseapp.com",
    projectId: "book-catalog-9f666",
    storageBucket: "book-catalog-9f666.appspot.com",
    messagingSenderId: "138445488014",
    appId: "1:138445488014:web:d9dc6d1dc5bf1f0a386edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);