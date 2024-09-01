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

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');
    const words = await response.text();
    // console.log(words);
    const wordArray = words.split("\n");
    // console.log(wordArray);
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    placeholder(word);
}
getWord();

// **symbol as a letter placeholder** //
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
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
    correctLetters(guess);    
    wordGuessUpdate();
    updateWordInProgress(guessedLetters);
 }
};

const wordGuessUpdate = function () {
    allGuesses.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        allGuesses.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
       }
    }
    wordInProgress.innerText = revealWord.join("");
    didYouWin();
};

const correctLetters = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        messages.innerText = `Sorry, the word doesn't have an ${guess}.`;
        remainingGuesses -= 1;
    } else {
        messages.innerText = `Good guess! The word contains the letter ${guess}!`;
    }

    if (remainingGuesses <= 0) {
        messages.innerText = `Game over! Sorry, the correct word was ${word}. Better luck next time!`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessesLeft.innerText = `${remainingGuesses} guess`;
    } else {
        guessesLeft.innerText = `${remainingGuesses} guesses`;
    }
};

const didYouWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    
    startOver();
    }
};

const startOver = function () {
    button.classList.add("hide");
    numGuesses.classList.add("hide");
    allGuesses.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
    messages.classList.remove("win");
    messages.innerHTML = "";
    allGuesses.innerHTML = "";
    remainingGuesses = 8;
    guessedLettersuessed = [];
    guessesLeft.innerText = `${remainingGuesses} guesses`;

    getWord();
    
    button.classList.remove("hide");
    numGuesses.classList.remove("hide");
    allGuesses.classList.remove("hide");
    playAgain.classList.add("hide");
});