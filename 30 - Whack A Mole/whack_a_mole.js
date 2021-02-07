const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const modes = document.querySelectorAll('select');
const timerDisplay = document.querySelector('.timer-display');
const highScore = JSON.parse(localStorage.getItem('score')) || 0;
let lastHole;
let timeUp = false;
let score = 0;
let mode;
let time;
let seconds = 30;
let countdown;
let secondsLeft;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];

    // adding a check to recursively call randomHole()
    if (hole === lastHole) return randomHole(holes);

    // storing value of last hole so that the next time we call randomHole
    // we aren't picking the previous hole, as probability of that happening
    // is quite high with only six holes
    lastHole = hole;
    return hole;
}

function peep() {
    if(mode === 'gentle') {
        time = randomTime(350, 1000);
    } else if (mode === 'fun') {
        time = randomTime(200, 900);
    } else {
        time = randomTime(50, 500);
    }
    const hole = randomHole(holes);
    hole.classList.add('up');
    // remove class after randomized time has expired
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    scoreBoard.textContent = 0;
    timeUp = false;
    timer(seconds);
    peep();
    setTimeout(() => {
        timeUp = true;
        if(score > highScore) localStorage.setItem('score', score);
    }, 30000);
}

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    countdown  = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(time) {
    timerDisplay.textContent = `00:${time < 10 ? '0' : ''}${time}`;
}

function bonk(e) {
    if (!e.isTrusted) return; // prevents us from accepting js clicks
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

function setMode() {
    mode = this.value
}

moles.forEach(mole => mole.addEventListener('click', bonk));
modes.forEach(mode => mode.addEventListener('change', setMode));

window.addEventListener('keyup', (e) => {
    if(mode === undefined && e.key === ' ') {
        alert('Please select a mode');
    } else {
        if(e.key === ' ') startGame();
    }
});
