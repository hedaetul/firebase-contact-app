// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBnpzYOsyGDeo0zrnSWNSpq3C9gGAQddWk',
  authDomain: 'fire-contact-d2eba.firebaseapp.com',
  projectId: 'fire-contact-d2eba',
  storageBucket: 'fire-contact-d2eba.appspot.com',
  messagingSenderId: '260088111489',
  appId: '1:260088111489:web:eaa65a5404e8e961c28880',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
