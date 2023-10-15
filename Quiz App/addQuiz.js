// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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



let question = document.getElementById('question')
let option = document.getElementById('option')
let optionsParent = document.getElementById('optionsParent')
let correctAnswersElem = document.getElementById('correctAnswer')
let li = document.getElementById("li")

let options = []
let correctAnswer;

function renderOption() {
    optionsParent.innerHTML = ""
    for (var i = 0; i < options.length; i++) {
        optionsParent.innerHTML += `<li id = "li" onclick = "correctAnswer('${options[i]}')" class = "w-100 fs-3 bg-white mt-2 rounded shadow p-3">'${options[i]}'</li>`
    }
    option.value = ""
}

window.correctAnswer = function (a) {
    correctAnswer = a
    correctAnswersElem.innerHTML = a
    console.log(correctAnswer)
}

window.addOption = function () {
    options.push(option.value)
    console.log(options)
    renderOption()
}

window.submitQuestion = function () {
    let obj = {
        question: question.value,
        options: options,
        correctAnswer: correctAnswer
    }
    obj.id = push(ref(db, 'questions/')).key
    const reference = ref(db, `questions/${obj.id}`)
    set(reference, obj)
        .then(() => {
            document.getElementById('submissionConfirmMessageDiv').innerHTML = "Data Submitted Sucessfully!"
            setTimeout(() => {
                document.getElementById('submissionConfirmMessageDiv').innerHTML = ""
            }, 3000);
        })
        .catch((error) => {
            document.getElementById('submissionConfirmMessageDiv').innerHTML = "The write failed... "
            setTimeout(() => {
                document.getElementById('submissionConfirmMessageDiv').innerHTML = ""
            }, 3000);
        });
    question.value = ""
    correctAnswersElem.innerHTML = ""
    optionsParent.value = ""
}

