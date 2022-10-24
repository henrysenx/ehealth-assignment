// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0HxmWNr8dI7TJ3FZQvfX4HweRAsvAwlA",
  authDomain: "ehealth-a9e39.firebaseapp.com",
  projectId: "ehealth-a9e39",
  storageBucket: "ehealth-a9e39.appspot.com",
  messagingSenderId: "510484467814",
  appId: "1:510484467814:web:938801bf54cf6dfedddda7",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
  db
}
