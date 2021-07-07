const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");
finalScore.innerText= mostRecentScore;
const highScore =JSON.parse(localStorage.getItem("highScores"))||[];


username.addEventListener("keyup",()=>{
    saveScoreBtn.disabled=!username.value;

})
console.log(mostRecentScore);


saveHighScore = e=>{
    console.log("clicked the save button");
    e.preventDefault();
    const score ={
        score: mostRecentScore,
        name: username.value
    }
    highScore.push(score);              
    highScore.sort((a,b)=>b.score-a.score);
    highScore.splice(5);
    
    
    localStorage.setItem("highScore",JSON.stringify(highScore));
   
    window.location.assign("/QuizApp")


}
