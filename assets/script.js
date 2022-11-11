var questions = [
    {
        title: "What does it means JS?",
        choices: ["Java", "Programming Language", "JavaScript", "Computational Language"],
        answer: "JavaScript"
    },
    {
        title: "Basic elements in HTML",
        choices: ["div, h1", "function read()", "npm test", "SELECT * FROM"],
        answer: "div, h1"
    },
    {
        title: "Which language gives style to our we pages?",
        choices: ["CSS", "HTML", "Node", "React"],
        answer: "CSS"
    },
    {
        title: "You can create _____ in GitHub",
        choices: ["Code", "Repositories", "Apps"],
        answer: "Repositories"
    },
    {
        title: "How to make variables?",
        choices: ["var (NOMBRE);", "(NOMBRE) var const", "const (NOMBRE) = 2;"],
        answer: "const (NOMBRE) = 2;"
    }
]

var answerMenu = document.querySelector("#answerMenu");
var showTime = document.getElementById("timeLeft");
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;


//This function start the quiz
function start(){
    timeLeft = 40;
    showTime.innerHTML = timeLeft

    timer = setInterval(function(){
        timeLeft--;
        showTime.innerHTML = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

//Next questions function + gonna create buttons for the questions

function next(){
    currentQuestion++;

    if(currentQuestion > questions.length -1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++){
        var buttonCode = "<button onclick='[ANS]'>[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);

        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer){
            buttonCode = buttonCode.replace("[ANS]", "correct()");  
        } else {
            buttonCode = buttonCode.replace("[ANS]", "wrong()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quiz").innerHTML = quizContent;
}

function endGame() {
    clearInterval(timer);

    var quizContent = `
        <h2>Game Over</h2>
        <h3> You got a ` + score + `/50</h3>
        <h3>That means you got `  + score / 10 + ` questions correct :-p</h3>
        <input type="text" id="name" placeholder="Enter your initials">
        <button onclick="inputScore()"> Set Score </button>`;

         document.getElementById("quiz").innerHTML = quizContent;
}

function inputScore(){
    var highscore = localStorage.getItem("highscore");
    if(score > highscore){
        localStorage.setItem("highscore", score);
        localStorage.setItem("highscoreName", document.getElementById("name").value);
    } else {
        localStorage.getItem("highscore");
        localStorage.getItem("highscoreName")
    }
    answerMenu.textContent = "";
    getScore();
}

//get Score 
function getScore(){
    var quizContent = 
    `<h2>`+ localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>`+ localStorage.getItem("highscore") + `</h1><br>
    <button onclick="clearScore()">Clear Score</button><button onclick="clearGame()">Play Again :)</button>`;

    document.getElementById("quiz").innerHTML = quizContent;
}

//Clear highscore
function clearScore(){
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    clearGame();
}

//Reset the time and questions
function clearGame(){
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1> Coding Quiz </h1>
    <h3> Click Start to Play :) </h3>
    <button onclick="start()"> Start:) </button>`;

    document.getElementById("quiz").innerHTML = quizContent;
}

//Function when an answer is wrong
function wrong(){
    answerMenu.setAttribute("class", "border-top mt-3 pt-3");
    answerMenu.setAttribute("style", "font-size: 20px; color: white; font-weight: bold; text-align: center;");
    answerMenu.textContent = "Wrong Answer :(";
    timeLeft -= 15;
    next();
}

function correct(){
    answerMenu.setAttribute("class", "border-top mt-3 pt-3")
    answerMenu.setAttribute("style", "font-size: 20px; color: white; font-weight: bold; text-align: center;");
    answerMenu.textContent = "Correct Answer :)";
    score += 10;
    next();
}
