import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Config
const firebaseConfig = {
  apiKey: "AIzaSyBREsRG5W3v_QRS2TIsxAzpTOaJuUbdFQI",
  authDomain: "muzika-1f14e.firebaseapp.com",
  projectId: "muzika-1f14e",
  storageBucket: "muzika-1f14e.appspot.com",
  messagingSenderId: "785740714643",
  appId: "1:785740714643:web:53c5730b6107a1aed47366",
  measurementId: "G-B01Z9ET8VZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
auth.useDeviceLanguage();

export default auth;
