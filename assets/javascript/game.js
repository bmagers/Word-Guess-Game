// ===== VARIABLES =====

var wordsToUse = ["CHICAGO", "DALLAS", "HOUSTON", "MIAMI", "PHILADELPHIA", "ATLANTA", "BOSTON", "PHOENIX", "DETROIT", "SEATTLE", "MINNEAPOLIS", "DENVER", "BALTIMORE", "CHARLOTTE", "PORTLAND", "OAKLAND", "TAMPA", "ORLANDO", "PITTSBURGH", "SACRAMENTO", "CINCINNATI", "CLEVELAND", "RALEIGH", "MILWAUKEE", "NASHVILLE", "AUSTIN", "INDIANAPOLIS", "ALBUQUERQUE"];
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
    document.getElementById("wrongGuesses").innerHTML = "";
    document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + guessesRemaining;
    document.getElementById("gameOver").innerHTML = "";
    document.getElementById("score").innerHTML = "<p>Wins: " + wins + "<br>Losses: " + losses + "</p>";
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
                document.getElementById("wrongGuesses").innerHTML = "Wrong guesses: " + wrongGuesses;
                document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + guessesRemaining;
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
                    document.getElementById("gameOver").innerHTML = "<h2>You lost.</h2><p>Press any key to play again.</p>";
                    losses++;
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
                    document.getElementById("gameOver").innerHTML = "<h2>You won!</h2><p>Press any key to play again.</p>";
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
                    gameOver = true;
                }
            }       
        }
    }
}
