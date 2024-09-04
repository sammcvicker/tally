export const elInput = document.querySelector("input");
export const elLetters = document.getElementById('letters');
export const elFeedback = document.getElementById('feedback');
export const elBody = document.querySelector('body');
export const elHelp = document.getElementById('help');
export const elRules = document.getElementById('rules');
export const elRound = document.querySelector('h2');
export const elBar = document.getElementById('bar');

export function showHelp() {
    elRules.style.display = 'block';
    elRound.style.opacity = '0';
    elInput.style.opacity = '0';
    elBar.style.opacity = '0';
    elLetters.style.opacity = '0';
    elHelp.textContent = 'X';
    elHelp.classList.remove('out');
    elHelp.classList.add('in');
    setTimeout(function () {
        elRules.style.opacity = '1';
    }, 100);
}

export function hideHelp() {
    elRules.style.opacity = "0";
    setTimeout(function () {
        elRules.style.display = 'none';
        elRound.style.opacity = '1';
        elInput.style.opacity = '1';
        elBar.style.opacity = '1';
        elLetters.style.opacity = '1';
        elHelp.textContent = '?';
        elHelp.classList.remove('in');
        elHelp.classList.add('out');
        elInput.focus();
    }, 100);
}

export function feedback(m) {
    elFeedback.textContent = m;
    elFeedback.style.opacity = "1";
    setTimeout(function () {
        elFeedback.style.opacity = "0";
    }, 1000);
}