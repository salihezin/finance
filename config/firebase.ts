
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeKvCXqSFDRyPNaYOn4MsIo3QF1U7ujdk",
  authDomain: "finance-education-83007.firebaseapp.com",
  projectId: "finance-education-83007",
  storageBucket: "finance-education-83007.firebasestorage.app",
  messagingSenderId: "417510050927",
  appId: "1:417510050927:web:a270f775851a2198ec519a",
  measurementId: "G-9Z9Z86VGBR"
};

const app = initializeApp(firebaseConfig); 

export const firebaseApp = app;
export const db = getFirestore(app);
export const auth = getAuth(app);