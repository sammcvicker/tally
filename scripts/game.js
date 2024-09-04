import { alphabet, images } from './data.js';
import { colorChange } from './colors.js';
import { elLetters, elInput, elRound, feedback } from './elements.js';
import { dictionary } from './dictionary.js';

let gameData = {
    round: 1,
    tileLetters: [],
    tileNumbers: [],
    wordsPlayedInPastRound: [],
    wordsPlayed: []
}

export function newGame() {
    // Begin by adding a tile of a random letter
    addTile(alphabet[Math.floor(Math.random() * (alphabet.length - 1))]);
}

export function tryToPlayWord(word) {
    try {
        playWord(word);
        redraw();
    }
    catch (error) {
        feedback(error.message);
    }
    if (canAdvanceRound()) {
        if (gameData.tileLetters.length < 26) {
            nextLetter();
        }
        nextRound();
    }
    redraw();
}

function redraw() {
    for (var i = 0; i < gameData.tileLetters.length; i++) {
        let img = document.querySelector("." + gameData.tileLetters[i] + " img");
        img.src = images[gameData.tileNumbers[i]];
        if (img.src == images[5]) {
            img.parentElement.classList.add("five");
        }
    }
}

function addTile(letter) {
    // Update gameData
    gameData.tileLetters.push(letter);
    gameData.tileNumbers.push(0);
    // Tile
    let tileDiv = document.createElement('div');
    tileDiv.classList.add('letter', letter);
    // Tile Image
    let tileImg = document.createElement('img');
    tileImg.src = images[0];
    tileDiv.append(tileImg);
    // Tile Text
    let tileP = document.createElement('p');
    tileP.textContent = letter;
    tileDiv.append(tileP);
    // Append to the letters div
    elLetters.append(tileDiv);
    redraw();
}

function playWord(word) {

    // If the word is in the dictionary
    if (dictionary.indexOf(word) > -1) {
        // and it hasn't been played before
        if (gameData.wordsPlayed.indexOf(word) == -1) {

            // and you have enough letters
            let copy = [...gameData.tileNumbers];
            for (let c = 0; c < word.length; c++) {
                const charIndex = gameData.tileLetters.indexOf(word[c]);
                if (charIndex !== -1) {
                    if (copy[charIndex] >= 5) {
                        throw new Error("you don't have enough letters");
                    }
                    copy[charIndex] += 1;
                }
            }

            // then...
            feedback(word)
            gameData.tileNumbers = copy;
            gameData.wordsPlayed.push(word);
            gameData.wordsPlayedInPastRound.push(word)
            elInput.value = '';
        }
        else {
            throw new Error("word already played");
        }
    } else {
        throw new Error("not a word");
    }
}

function canAdvanceRound() {
    return gameData.tileNumbers.every(n => n == 5)
}

function nextLetter() {

    var getMax = function (str) {
        var max = 0,
            maxChar = '';
        str.split('').forEach(function (char) {
            if (str.split(char).length > max) {
                max = str.split(char).length;
                maxChar = char;
            }
        });
        return maxChar;
    };

    let pastRoundLettersExcludingTileLetters = gameData.wordsPlayedInPastRound
        .join('')
        .split('')
        .filter(l => gameData.tileLetters.indexOf(l) == -1)
        .join('');;
    let newLetter = getMax(pastRoundLettersExcludingTileLetters);
    // If it's a tie, then pick a random letter remaining
    if (newLetter == '') {
        const alphabetExcludingTileLetters = alphabet.filter(l => gameData.tileLetters.indexOf(l) == -1);
        newLetter = alphabetExcludingTileLetters[Math.floor(Math.random() * (alphabetExcludingTileLetters.length - 1))];
    }
    addTile(newLetter);
}

function nextRound() {
    gameData.round += 1;
    elRound.textContent = 'Round ' + gameData.round;
    gameData.wordsPlayedInPastRound = [];
    // Remove the five class from all tiles
    for (let i = 0; i < gameData.tileNumbers.length; ++i) {
        gameData.tileNumbers[i] = 0;
        let elLetter = document.querySelector('.' + gameData.tileLetters[i])
        if (elLetter.classList.contains('five')) {
            elLetter.classList.remove('five');
        }
    }
    feedback("next round!");
    colorChange();
}