import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzrRem7CKGp7HHKHN457NIjLUu2nurcjU",
  authDomain: "m7b-shoes.firebaseapp.com",
  projectId: "m7b-shoes",
  storageBucket: "m7b-shoes.appspot.com",
  messagingSenderId: "552890737418",
  appId: "1:552890737418:web:b68a5a3608a6a3abb390f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };