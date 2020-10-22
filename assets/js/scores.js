function showScores() {
  
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  /*sort high scores*/
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    /*create list tag*/
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    /*show on page*/
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
/*clear scores on click*/
document.getElementById("clear").onclick = clearHighscores;

/*run*/
showScores();
