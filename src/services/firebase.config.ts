import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyFI3n7z6brR_FIR4yUD428Vcv4jz0VQ0",
    authDomain: "todos-6c140.firebaseapp.com",
    projectId: "todos-6c140",
    storageBucket: "todos-6c140.appspot.com",
    messagingSenderId: "921472336188",
    appId: "1:921472336188:web:7e0d51e57441c296d99e39",
    measurementId: "G-48LKZENRHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)