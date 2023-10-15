// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded, push, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA84lIY_C2V-4CBqb0cKW6yFM7BxdVCg4g",
    authDomain: "quizwebapp-cc540.firebaseapp.com",
    projectId: "quizwebapp-cc540",
    storageBucket: "quizwebapp-cc540.appspot.com",
    messagingSenderId: "503879150427",
    appId: "1:503879150427:web:0dd23ac744534f6a24c87e",
    measurementId: "G-TJ9EE6XK4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

