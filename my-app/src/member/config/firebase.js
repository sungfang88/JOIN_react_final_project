// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPL1TOszZliZj1kKAmlV3TVY8cz1J8ULc',
  authDomain: 'react-try-e3fe0.firebaseapp.com',
  projectId: 'react-try-e3fe0',
  storageBucket: 'react-try-e3fe0.appspot.com',
  messagingSenderId: '651608719663',
  appId: '1:651608719663:web:13392caa588d44fd4521da',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleprovide = new GoogleAuthProvider()

