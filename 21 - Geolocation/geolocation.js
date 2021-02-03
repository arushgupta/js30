// need to be moving or set a location in simulator
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const units = document.querySelector('.units');
let isMiles = false;

navigator.geolocation.watchPosition((data) => {
    if (isMiles) {
        speed.textContent = (data.coords.speed * 0.6214).toFixed(2);
        units.textContent = 'M/H';
    } else {
        speed.textContent = (data.coords.speed).toFixed(2);
        units.textContent = 'KM/H';
    }
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
    alert('Please provide location permission to view speed and direction');
});
speed.addEventListener('click', () => isMiles = !isMiles);
