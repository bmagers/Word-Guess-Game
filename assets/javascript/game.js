

// Use Cases:

// Use #1: The user loads the page
    // display "Press any key to start"
    // underscores of word
    // # of guesses used, remaining
    // wins, losses, etc.

// Use #2: user clicks a letter
    // if user guesses a letter that's in the word, display letter in its position
    // otherwise, use up guess
    // if guesses remaining = 0, user loses, increase losses by 1
    // if user guesses all letters, increase wins by 1

// variables, then functions, then event listeners

// ===== VARIABLES =====

var wordsToUse = ["CHICAGO", "DALLAS", "HOUSTON", "MIAMI", "PHILADELPHIA", "ATLANTA", "BOSTON", "PHOENIX", "DETROIT", "SEATTLE", "MINNEAPOLIS", "DENVER", "BALTIMORE", "CHARLOTTE", "PORTLAND"]
var usedWords = [];
var currentWord;
var displayWord = "";
var userInput;
var guessesRemaining = 10;
var wrongGuesses = [];
var rightGuesses = [];
var wins = 0;
var losses = 0;
var underscores = [];  // ?

// ===== FUNCTIONS =====

function reset() {
    guessesRemaining = 10;
    // randomly choose word
    currentWord = wordsToUse[Math.floor(Math.random() * (wordsToUse.length - 1))];
    // fine length of word, display underscores
    for (var letters = 0; letters < currentWord.length; letters++)
    {
        underscores += "_";
        document.getElementById("theWord").innerHTML += "_ ";
        displayWord += "_";
    }
    // display underscores
    document.getElementById("theWord").innerHTML = displayWord;
    console.log("currentWord: " + currentWord);
    document.getElementById("win").hidden = true;
}


// ===== EVENT LISTENERS =====

window.onload = function() {
    reset();
}

document.onkeyup = function(event) {
    userInput = event.key.toUpperCase();

    if (/^[a-zA-Z]+$/.test(userInput) && userInput.length == 1 && !(wrongGuesses.includes(userInput) || rightGuesses.includes(userInput))) {
        var letterPosition = currentWord.indexOf(userInput);
        if (letterPosition === -1) {
            // wrong guess
            guessesRemaining--;
            wrongGuesses.push(userInput);
        } else {
            // right guess
            rightGuesses.push(userInput);

            // loop through word and update displayWord with letters
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
            if (win) {
                document.getElementById("win").hidden = false;
            }
        }
    
        document.getElementById("guessesRemaining").innerHTML = "Guesses remaining: " + guessesRemaining;
    
        document.getElementById("wrongGuesses").innerHTML = "Wrong guesses: " + wrongGuesses;
    }

}
