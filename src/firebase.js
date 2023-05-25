import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAxMpxPzC2TaN9LZxiZ0m8gM6G6kWq7Bf8",
	authDomain: "whatsapp-clone-e773c.firebaseapp.com",
	projectId: "whatsapp-clone-e773c",
	storageBucket: "whatsapp-clone-e773c.appspot.com",
	messagingSenderId: "572448918075",
	appId: "1:572448918075:web:349c477462a7e16e5aaa1e",
	measurementId: "G-FE5PK4GWRF",
});
// FOR DATABASE
const db = firebase.firestore();

// FOR FIREBASE AUTHENTICATION
const auth = firebase.auth();

// FOR GOOGLE AUTHENTICATION
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
