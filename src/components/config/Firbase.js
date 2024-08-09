import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, increment } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyA5LizjOSpqvX-hDXmL3OU_aqCD49Am078",
   authDomain: "portfolio-1cc58.firebaseapp.com",
   projectId: "portfolio-1cc58",
   storageBucket: "portfolio-1cc58.appspot.com",
   messagingSenderId: "766771449677",
   appId: "1:766771449677:web:567250a8bc30065b517104",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, increment };
