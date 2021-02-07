const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const modes = document.querySelectorAll('select');
let lastHole;
let timeUp = false;
let score = 0;
let mode;
let time;

console.log(modes);

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
    peep();
    setTimeout(() => timeUp = true, 30000);
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
