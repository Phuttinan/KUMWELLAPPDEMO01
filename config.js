import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpRFrLcg3dqhKnai4tuPwTH-sxQTxtEK8",
    authDomain: "fir-7c837.firebaseapp.com",
    databaseURL: "https://fir-7c837-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-7c837",
    storageBucket: "fir-7c837.appspot.com",
    messagingSenderId: "990092186797",
    appId: "1:990092186797:web:55a30d5e185cc16a0fa224",
    measurementId: "G-ZDR2H6SLN9"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };