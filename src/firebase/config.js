import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCl3hPXG1uiIs-b0R4NPYbpHs2R1KONLaI",
    authDomain: "proyecto-final-prog3.firebaseapp.com",
    projectId: "proyecto-final-prog3",
    storageBucket: "proyecto-final-prog3.firebasestorage.app",
    messagingSenderId: "335824975578",
    appId: "1:335824975578:web:52f7df4fc812d667ae17e3"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();