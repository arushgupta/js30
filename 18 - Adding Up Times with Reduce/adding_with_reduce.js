const timeNodes = [...document.querySelectorAll('[data-time]')];
const time = timeNodes.map(node => node.dataset.time)
    .map(timeCode => {
        //const [minutes, seconds] = timeCode.split(':');
        //return (parseInt(minutes) * 60) + parseInt(seconds)
        // Can also be done as follows:
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds);

let seconds = time;
const hours = Math.floor(seconds / 3600);
seconds = (seconds % 3600);
const minutes = Math.floor(seconds / 60);
seconds = (seconds % 60);
let secondsStr = '';
let minutesStr = '';

if (seconds <= 9) {
    secondsStr = `0${seconds}`;
} else {
    secondsStr = `${seconds}`;
}
if (minutes <= 9) {
    minutesStr = `0${minutes}`;
} else {
    minutesStr = `${minutes}`;
}

console.log(`hours: ${hours}`, `minutes: ${minutesStr}`, `seconds: ${secondsStr}`);
document.querySelector('.total').innerHTML = `
            <span>Watch time <b>${hours}</b>:<b>${minutesStr}</b>:<b>${secondsStr}</b></span>
            `;
