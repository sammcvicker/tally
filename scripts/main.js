import { elInput, showHelp, hideHelp } from './elements.js';
import { newGame, tryToPlayWord } from './game.js';

window.onload = function () {
    // Setup event listeners
    elInput.onkeydown = inputKeyDown;
    document.onclick = documentClick;
    // Start a new game
    newGame();
    elInput.focus();
};

function inputKeyDown(event) {
    // If it's enter, then try to play the word
    if (event.key == "Enter") {
        event.preventDefault;
        tryToPlayWord(elInput.value.trim().toLowerCase().split(' ').join(''))
    }
}

function documentClick(event) {
    // If the help button is clicked, show or hide the help
    // Otherwise, focus on the input
    if (event.target.matches('#help.out')) {
        showHelp();
    }
    else if (event.target.matches('#help.in')) {
        hideHelp();
    }
    else {
        elInput.focus();
    }
}