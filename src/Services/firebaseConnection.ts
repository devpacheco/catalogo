import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-inbyIXvm3Sxr3OQm_Ghf3jnYvlVbEKc",
  authDomain: "m7bshoes-7dedc.firebaseapp.com",
  projectId: "m7bshoes-7dedc",
  storageBucket: "m7bshoes-7dedc.appspot.com",
  messagingSenderId: "803584062315",
  appId: "1:803584062315:web:2073ed0503b4026862122e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };