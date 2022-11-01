"use strict"
let wrongArr = [
    'legs',
    'arms',
    'body',
    'head',
    'scaffold'
];
const words = ["apa", "papper"];
let set;
playGame();

function playGame() {
    let correctAnswer = words[Math.floor(Math.random() * words.length)];
    let mysteryWord = Array(correctAnswer.length).fill("_");
    let guessedLetter = "";
    let word = document.querySelector("#word");
    let guessed = document.querySelector("#guessed");
    let buttonAgain = document.querySelector("#again");
    buttonAgain.style.visibility = "hidden"
    word.innerHTML = mysteryWord.join("  ");
    let lifesCount = 4;
    let oldLetters = [];
    let first = true;
console.log(mysteryWord,guessedLetter, lifesCount, oldLetters, first);
    document.querySelector("#guess").addEventListener('keydown', (event) => {
        console.log(oldLetters);
        if (event.key === "Enter") {
            if (first) {
                let sec = 10
                let timer = document.querySelector("#timer");
                first = false;
                set = setInterval(() => {
                    timer.innerHTML = sec;
                    if (sec === 0) {
                        gameOver("loss");
                    }
                    sec--;
                }, 1000)
            }
            let input = document.querySelector("#guess");
            if (input.value.length === 1) {
                guessedLetter = input.value
            }
            input.value = "";
            // console.log(oldLetters);
            if (oldLetters.includes(guessedLetter)) {
                alert("Already Guessed")
            } else {
                console.log(correctAnswer, mysteryWord);
                let indeces = [];
                for (let i = 0; i < correctAnswer.length; i++) {
                    if (correctAnswer[i] === guessedLetter) {
                        indeces.push(i);
                    }
                }
                if (indeces.length === 0) {
                    oldLetters.push(guessedLetter)
                    document.querySelector('figure').classList.add(wrongArr[lifesCount])
                    if (lifesCount === 0) {
                        oldLetters = [];
                        gameOver("loss");
                    }
                    lifesCount--;
                } else {
                    for (let i = 0; i < indeces.length; i++) {
                        mysteryWord[indeces[i]] = guessedLetter;
                        word.innerHTML = mysteryWord.join(" ");
                        if (mysteryWord.indexOf("_") === -1) {
                            gameOver("win");
                        }
                    }
                }
            }
            guessed.innerHTML = `wrong: ${oldLetters.join(" ")}`
        }
    })
}


function gameOver(text) {
    clearInterval(set);
    let over = document.querySelector("#answer");
    over.innerHTML = `gameOver: ${text}`;
    let ggg = document.querySelector("#guess");
    ggg.style.visibility = "hidden";
    let butt = document.querySelector("#again");
    let gu = document.querySelector("#guessed");
    let timer = document.querySelector("#timer");
    butt.style.visibility = "visible";
    butt.addEventListener('click', () => {
        // over.innerHTML = "";
        // butt.style.visibility = "hidden";
        // gu.innerHTML = "";
        // timer.innerHTML = 11;
        // ggg.style.visibility = "visible";
        // first = true
        // playGame()
        location.reload()
    })
    // document.querySelector("#guess").style.disabled = "disabled";
    // document.querySelector(".game-control button").removeEventListener('click', click);
}
