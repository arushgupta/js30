const divs = document.querySelectorAll('div');
const onceButton = document.querySelector('.click');
const propagate = document.querySelector('.propagate');

let stopPropagation = false;

function logText(e) {
    if(this.classList.value === 'inner') return;
    console.log(this.classList.value);
    if (stopPropagation) e.stopPropagation();
    //e.stopPropagation(); // stops bubbling up
}

function updatePropagation() {
    stopPropagation ? propagate.textContent = 'Stop Propagation': propagate.textContent = 'Start Propagation';
    stopPropagation = !stopPropagation;
}

// shows bubbling, clicking the inner most div will also capture events for the divs wrapping it
// adding optional capture as true, the function will run on capture down
// default value of capture is false
divs.forEach(div => div.addEventListener('click', logText, {
    capture: false
}));

// once unbinds the event listener to prevent future clicks on it
onceButton.addEventListener('click', () => {
    console.log("Enjoy while I'm here. Won't appear again 💩");
}, {
    once: true
});

propagate.addEventListener('click', updatePropagation);
