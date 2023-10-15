// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, push, set, onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyA84lIY_C2V-4CBqb0cKW6yFM7BxdVCg4g",
    authDomain: "quizwebapp-cc540.firebaseapp.com",
    databaseURL: "https://quizwebapp-cc540-default-rtdb.firebaseio.com",
    projectId: "quizwebapp-cc540",
    storageBucket: "quizwebapp-cc540.appspot.com",
    messagingSenderId: "503879150427",
    appId: "1:503879150427:web:0dd23ac744534f6a24c87e",
    measurementId: "G-TJ9EE6XK4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase();


let signUpBtn = document.getElementById('signUpBtn')




signUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            document.getElementById('message').innerHTML = "Account Created Please wait..."
            setTimeout(() => {
                location.href = './index.html'
            }, 3000);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById('errorMessage').innerHTML = "Error " + errorCode
            setTimeout(() => {
                document.getElementById('errorMessage').innerHTML = ""
            }, 3000);
        });
})