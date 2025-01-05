import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6VpLm1SVR4h5670akYMrT4oIEdZUyEB0",
  authDomain: "devmeetup-919fb.firebaseapp.com",
  projectId: "devmeetup-919fb",
  storageBucket: "devmeetup-919fb.appspot.com",
  messagingSenderId: "814835941836",
  appId: "1:814835941836:web:2b3b6b2dfca0a5248edd69",
  measurementId: "G-V62XX50F6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
//const storage = getStorage(app);
export { db, auth };
