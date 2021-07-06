const highScoreList = document.getElementById("highScoreList");
const highScore = JSON.parse(localStorage.getItem("highScore"))||[];

highScoreList.innerHTML= highScore.map((score)=>`<li class="highScore">${score.name}-${score.score}</li>`).join("");