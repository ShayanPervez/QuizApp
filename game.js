const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBarText = document.getElementById("progressBarText");
const scores = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers= false;
let score =0;
let questionCounter =0;
let availableQuestions = [];

let questions = [];
fetch("questions.json").then((res)=>res.json()).then(loadedQuestions=>{
    questions=loadedQuestions;
     startGAme();
    }).catch(err=>console.log(err));    

//Constants 
const CORRECT_BONUS = 10;
const  MAX_QUESTION = 3;

startGAme= ()=>{
questionCounter =0;
score =0;
availableQuestions = [...questions];
console.log(availableQuestions);
getNewQuestion();
}

getNewQuestion=()=>{
if (availableQuestions.length===0 || questionCounter>= MAX_QUESTION) {
    localStorage.setItem("mostRecentScore",score);
    return window.location.assign("/end.html");
}

questionCounter++;
progressBarText.innerText=`Question ${questionCounter}/${MAX_QUESTION}`;
//Update the progress
progressBarFull.style.width= `${(questionCounter/MAX_QUESTION)*100}%`;

const questionIndex= Math.floor(Math.random()*availableQuestions.length);

currentQuestion=availableQuestions[questionIndex];
question.innerText = currentQuestion.question;

choices.forEach((choice)=>{
const number = choice.dataset["number"];
choice.innerText= currentQuestion["choice"+ number];
});

availableQuestions.splice(questionIndex,1);
acceptingAnswers=true;


};

choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        if (!acceptingAnswers) return;

        

        acceptingAnswers=false;
        const selectChoices = e.target;
        const selectAnswers=selectChoices.dataset["number"];
        const classToApply= selectAnswers==currentQuestion.answer?'correct':'incorrect';
        if (classToApply==='correct') {
            incrementScore(CORRECT_BONUS);
        }


        selectChoices.parentElement.classList.add(classToApply);
        setTimeout(()=>{
            selectChoices.parentElement.classList.remove(classToApply);
        getNewQuestion();

        },1000);    
        
    });
});

incrementScore=num=>{
    score+=num;
    scores.innerText=score;
}


