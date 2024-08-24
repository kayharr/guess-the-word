// guessed letters
const allGuesses = document.querySelector(".guessed-letters");
// button
const button = document.querySelector(".guess");
// text input
const letterInput = document.querySelector(".letter");
// word guess in progress
const wordInProgress = document.querySelector(".word-in-progress");
// remaining guesses
const numGuesses = document.querySelector(".remaining");
// span
const guessesLeft = document.querySelector(".remaining span");
// messages
const messages = document.querySelector(".message");
// play again
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// **symbol as a letter placeholder** //
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText= placeholderLetters.join("");
};

placeholder(word);

// **guess button** //
button.addEventListener("click", function (e) {
    e.preventDefault();
    messages.innerText = "";
    const guess = letterInput.value;
    console.log(guess);
    const goodGuess = validateInput(guess);
   
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

// **validate player input** //
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = "Must enter a letter.";
    } else if (input.length > 1) {
        messages.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please enter a letter from A to Z";
    } else {
        return input;
    }
};

// **adding valid inputs to array** //
const makeGuess = function (guess) {
 guess = guess.toUpperCase();
 if (guessedLetters.includes(guess)) {
    messages.innerText = "You already guessed that letter, silly! Try again.";
 } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
 }
};