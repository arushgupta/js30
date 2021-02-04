const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const rateVal = document.querySelector('.rate');
const pitchVal = document.querySelector('.pitch');

msg.text = document.querySelector('[name="text"]').value;
// converts the text to an array of sentences
let messages = msg.text.replace(/([?.,!])\s*(?=[A-Z])/g, "$1|").split("|");

function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice =>
            `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        // looping over sentences and adding a delay
        messages.forEach((message, index) => {
            setTimeout(() => {
                msg.text = message;
                console.log(msg.text);
                speechSynthesis.speak(msg);
            }, 1000 * index);
        });

    }
}

function setOption() {
    if (this.name === 'rate') {
        rateVal.textContent = this.value;
    } else if (this.name === 'pitch') {
        pitchVal.textContent = this.value;
    } else if (this.name === 'text') {
        // create an array of sentences for updated text
        messages = this.value.replace(/([?.,!])\s*(?=[A-Z])/g, "$1|").split("|");
    }
    msg[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
// the following only runs on page load
// stopButton.addEventListener('click', toggle(false));
// the following two ways can be used to pass a parameter to the function
// stopButton.addEventListener('click', toggle.bind(null, false));
stopButton.addEventListener('click', () => toggle(false));
