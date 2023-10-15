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




let loader = document.getElementById("loader")
let mainContainer = document.getElementById("mainContainer")
let questions = []

let totalQuestions = document.getElementById("totalQuestions")
let firstQuestions = document.getElementById("firstQuestions")
let question = document.getElementById("question")
let answerParent = document.getElementById("answerParent")


let index = 0;
let score = 0;

let getDataFromDatabase = () => {
    loader.style.display = 'block'
    mainContainer.style.display = 'none'

    const reference = ref(db, 'questions/')
    onChildAdded(reference, (data) => {
        questions.push(data.val())
        loader.style.display = 'none'
        mainContainer.style.display = 'block'
        renderFunction()
    })
}
getDataFromDatabase()




window.nextQuestion = () => {
    if (index + 1 === questions.length) {
        mainContainer.innerHTML = `<div style="height: 50vh;margin-top: 100px;" class="bg-info-subtle">
        <div class="row">
            <div class="col-md-12 mt-5">
                <div id="submissionMsg" class="text-center fs-1">Enter Your Name</div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 d-flex justify-content-center mt-5">
                <input class="w-50 rounded shadow border p-3" placeholder="Name" type="text" name="" id="userName">
                <button id="submitBtn" onclick="submitResponse('${score}')" class="btn btn-success ms-3">Submit</button>
            </div>
        </div>
      </div>`
    } else {
        index++
        renderFunction()
    }
}

window.checkQuestion = (a, b) => {
    if (a == b) {
        score++
        console.log(score)
    }
    nextQuestion()
}

let renderFunction = () => {
    totalQuestions.innerText = questions.length;
    firstQuestions.innerHTML = index + 1;
    let obj = questions[index]
    question.innerHTML = obj.question
    answerParent.innerHTML = ""
    for (var i = 0; i < obj.options.length; i++) {
        answerParent.innerHTML += `<div class="col-md-3">
        <div>
        <button onclick="checkQuestion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-dark p-3 w-100 mt-4">'${obj.options[i]}'</button>
        </div>
        </div>`
    }
}

window.submitResponse = (score) => {
    let userName = document.getElementById("userName").value
    if (userName == "") {
        alert("Please enter your name")
    } else {
        let obj = {
            score: score,
            userName: userName
        }
        obj.id = push(ref(db, 'score/')).key
        const reference = ref(db, `score/${obj.id}`)
        set(reference, obj)
        document.getElementById("submissionMsg").style.backgroundColor = "green"
        document.getElementById("submissionMsg").style.color = "white"
        document.getElementById("submissionMsg").style.fontSize = "20px"
        document.getElementById("submissionMsg").innerHTML = "Submitted Successfully"
        setTimeout(() => {
            location.href = "./login.html"
        }, 1000);

        document.getElementById("submitBtn").style.display = "none"
    }
}

renderFunction()




