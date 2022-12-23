// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDpiaeU3Po27j7dkixpX8EU7lhTvRXPiSU",
	authDomain: "blackstellar-40127.firebaseapp.com",
	projectId: "blackstellar-40127",
	storageBucket: "blackstellar-40127.appspot.com",
	messagingSenderId: "874585707667",
	appId: "1:874585707667:web:52d38b3c9f52313623a966",
	measurementId: "G-5T6GXWH02L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
