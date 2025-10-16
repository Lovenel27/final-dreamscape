import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";



const firebaseConfig = {
  apiKey: "AIzaSyCzVwygm8eCejO3YqLrCAZYDal7pFa7oFo",
  authDomain: "midterm-dreamscape-22dfe.firebaseapp.com",
  projectId: "midterm-dreamscape-22dfe",
  storageBucket: "midterm-dreamscape-22dfe.firebasestorage.app",
  messagingSenderId: "496737832403",
  appId: "1:496737832403:web:0107e8d33ad6f8ac0cb326"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;