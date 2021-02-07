let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const pauseButton = document.querySelector('.pause');
const timerStatus = document.querySelector('.timer-status');
let secondsLeft;
let isTimerPaused = false;

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop
        // but the return statement will require us to set it to a variable
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    let remainderSeconds = seconds % 3600;
    const minutes = Math.floor(remainderSeconds / 60);
    remainderSeconds = remainderSeconds % 60;
    const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    endTime.textContent = `Be Back At ${adjustedHour < 10 ? '0' : ''}${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}${hour >= 12 ? 'pm' : 'am'}`;
}

function startTimer() {
    timer(parseInt(this.dataset.time));
}

function pauseOrStart() {
    if(isTimerPaused) {
        isTimerPaused = !isTimerPaused;
        timerStatus.textContent = '';
        pauseButton.textContent = 'Pause';
        timer(secondsLeft);
    } else {
        clearInterval(countdown);
        isTimerPaused = !isTimerPaused;
        timerStatus.textContent = 'PAUSED';
        pauseButton.textContent = 'Resume';
    }
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});


pauseButton.addEventListener('click', pauseOrStart);
