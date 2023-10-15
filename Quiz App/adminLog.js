// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
//Authentication Firebase Config From project(Auth)
const firebaseConfig = {
    apiKey: "AIzaSyBz83iux4JwUDaxxV9votCdz8C6Axj3Q30",
    authDomain: "auth-5326d.firebaseapp.com",
    databaseURL: "https://auth-5326d-default-rtdb.firebaseio.com",
    projectId: "auth-5326d",
    storageBucket: "auth-5326d.appspot.com",
    messagingSenderId: "346270989911",
    appId: "1:346270989911:web:981f16e00bde8ac785ed12",
    measurementId: "G-SGXG7X4H6M"
};

//Authentication Firebase Config From project(Auth)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

signInBtnAdmin.addEventListener('click', (e) => {
    e.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            document.getElementById('message').innerHTML = "Logging you in Please wait..."
            setTimeout(() => {
                location.href = './adminPanel.html'
            }, 3000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById('errorMessage').innerHTML = errorCode
            setTimeout(() => {
                document.getElementById('errorMessage').innerHTML = ""
            }, 3000);
        });
});