// ===== VARIABLES =====

var wordsToUse = ["CHICAGO", "DALLAS", "HOUSTON", "MIAMI", "PHILADELPHIA", "ATLANTA", "BOSTON", "PHOENIX", "DETROIT", "SEATTLE", "MINNEAPOLIS", "DENVER", "BALTIMORE", "CHARLOTTE", "PORTLAND", "OAKLAND", "TAMPA", "ORLANDO", "PITTSBURGH", "SACRAMENTO", "CINCINNATI", "CLEVELAND", "RALEIGH", "MILWAUKEE", "NASHVILLE", "AUSTIN", "INDIANAPOLIS", "ALBUQUERQUE"];
var mapKeys = ["CHICAGO", "DALLAS", "HOUSTON", "MIAMI", "PHILADELPHIA", "ATLANTA", "BOSTON", "PHOENIX", "DETROIT", "SEATTLE", "MINNEAPOLIS", "DENVER", "BALTIMORE", "CHARLOTTE", "PORTLAND", "OAKLAND", "TAMPA", "ORLANDO", "PITTSBURGH", "SACRAMENTO", "CINCINNATI", "CLEVELAND", "RALEIGH", "MILWAUKEE", "NASHVILLE", "AUSTIN", "INDIANAPOLIS", "ALBUQUERQUE"];
var mapLats = [41.8781, 32.7767, 29.7604, 25.7617, 39.9526, 33.7490, 42.3601, 33.4484, 42.3314, 47.6062, 44.9778, 39.7392, 39.2904, 35.2271, 45.5122, 37.8044, 27.9506, 28.5383, 40.4406, 38.5816, 39.1031, 41.4993, 35.7796, 43.0389, 36.1627, 30.2672, 39.7684, 35.0844];
var mapLongs = [-87.6928, -96.7970, -95.3698, -80.1918, -75.1652, -84.3880, -71.9589, -112.0740, -83.0458, -122.3321, -93.2650, -104.9903, -76.6122, -80.8431, -122.6587, -122.2711, -82.4572, -81.3792, -79.9959, -121.4944, -84.5120, -81.6944, -78.6382, -87.9065, -86.7816, -97.7431, -86.1581, -106.6504];
var usedWords = [];
var currentWord;
var displayWord;
var userInput;
var wrongGuesses = [];
var rightGuesses = [];
var guessesRemaining;
var wins = 0;
var losses = 0;
var gameOver = false;

// ===== FUNCTIONS =====

function reset() {
    gameOver = false;
    currentWord = wordsToUse[Math.floor(Math.random() * (wordsToUse.length - 1))];
    displayWord = "";
    rightGuesses = [];
    wrongGuesses = [];
    guessesRemaining = 8;
    for (var letters = 0; letters < currentWord.length; letters++)
    {
        displayWord += "_";
    }
    console.log("currentWord: " + currentWord);
    document.getElementById("theWord").innerHTML = displayWord;
    document.getElementById("message").innerHTML = "GUESSES: " + wrongGuesses + "&nbsp;&nbsp;&nbsp;" + guessesRemaining + " REMAINING";
    document.getElementById("gameOver").innerHTML = "";
    document.getElementById("score").innerHTML = "<p>WINS: " + wins + "<br>LOSSES: " + losses + "</p>";
}

// ===== EVENT LISTENERS =====

window.onload = function() {
    reset();
}

document.onkeyup = function(event) {
    userInput = event.key.toUpperCase();

    if (gameOver) {
        reset();
    } else {
        if (userInput.length == 1 && /^[A-Z]+$/.test(userInput) && !(wrongGuesses.includes(userInput) || rightGuesses.includes(userInput))) {
            var letterPosition = currentWord.indexOf(userInput);
            if (letterPosition === -1) {
                // wrong guess
                wrongGuesses.push(userInput);
                guessesRemaining--;
                document.getElementById("message").innerHTML = "GUESSES: " + wrongGuesses + "&nbsp;&nbsp;&nbsp;" + guessesRemaining + " REMAINING";
                // check for loss
                if (guessesRemaining === 0) {
                    // loop through word to display un-guessed letters
                    displayWord = "";
                    for (var i = 0; i < currentWord.length; i++) {
                        var letter = currentWord.charAt(i);
                        if (rightGuesses.includes(letter)) {
                            displayWord += letter;
                        } else {
                            displayWord += "<span class='fail'>" + letter + "</span>";
                        }
                    }
                    document.getElementById("theWord").innerHTML = displayWord;
                    document.getElementById("message").innerHTML = "PRESS ANY KEY TO PLAY AGAIN";
                    losses++;
                    var audioLoss = new Audio('https://actions.google.com/sounds/v1/cartoon/concussive_hit_guitar_boing.ogg');
                    audioLoss.play();
                    document.getElementById("score").innerHTML = "<p>WINS: " + wins + "<br>LOSSES: " + losses + "</p>";
                    gameOver = true;
                }
            } else {
                // right guess
                rightGuesses.push(userInput);
                // loop through word and update display with guessed letters
                displayWord = "";
                var win = true;
                for (var i = 0; i < currentWord.length; i++) {
                    var letter = currentWord.charAt(i);
                    if (rightGuesses.includes(letter)) {
                        displayWord += letter;
                    } else {
                        displayWord += "_";
                        win = false;
                    }
                }
                document.getElementById("theWord").innerHTML = displayWord;
                // check for win
                if (win) {
                    document.getElementById("message").innerHTML = "PRESS ANY KEY TO PLAY AGAIN";
                    usedWords.push(currentWord);
                    var i = wordsToUse.indexOf(currentWord);
                    if (i !== -1) {
                        wordsToUse.splice(i, 1);
                    }
                    if (wordsToUse.length == 0) {
                        wordsToUse = usedWords;
                        usedWords = [];
                    }
                    wins++;
                    var audioWin = new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
                    audioWin.play();
                    // add pin to map
                    var mapKey = mapKeys.findIndex(function(element) {
                        return element === currentWord;
                    });
                    var coordinates = {
                        lat: parseFloat(mapLats[mapKey]),
                        lng: parseFloat(mapLongs[mapKey])
                    }
                    var marker = new google.maps.Marker({
                        position: coordinates,
                        map: map,
                        animation: google.maps.Animation.DROP
                    })
                    document.getElementById("score").innerHTML = "<p>WINS: " + wins + "<br>LOSSES: " + losses + "</p>";
                    gameOver = true;
                }
            }       
        }
    }
}
