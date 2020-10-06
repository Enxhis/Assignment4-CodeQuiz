
// Highscore HTML functions
function showHighscores() {
    // get scores from localstorage or if there is no score empty array
    var highscores = JSON.parse(window.localStorage.getItem("scores")) || [];
    //console.log(highscores);
    //  // sort highscores by score property in descending order
    highscores.sort(function (a, b) {
        return b.scores - a.scores;
    });

    highscores.forEach(function (scores) {
        //console.log(score);
        // create list tags for each score
        var listTag = document.createElement("li");
        listTag.textContent = scores.init + " : " + scores.score;
        //add list elements on page
        var ol = document.getElementById("highscores");
        ol.appendChild(listTag);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("scores");
    window.location.reload();
}

//shows highscore
showHighscores();
// clear highscores
document.getElementById("clear").onclick = clearHighscores;