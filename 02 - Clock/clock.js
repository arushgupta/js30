const secondsHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setTime() {
    var now = new Date();
    var secondsAngle = (now.getSeconds() / 60) * 360 + 90;
    secondsHand.style.transform = `rotate(${secondsAngle}deg)`;

    var minuteAngle = (now.getMinutes() / 60) * 360 + 90;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;

    var hourAngle = (now.getHours() / 12) * 60 + 90;
    hourHand.style.transform = `rotate(${hourHand}deg)`;
}
setInterval(setTime, 1000)
