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

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText= placeholderLetters.join("");
};

placeholder(word);

button.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = letterInput.value;
    console.log(inputValue);
    button.value = "";
});
