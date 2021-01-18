function play(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const playedKey = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return; // stop function from running
    audio.currentTime = 0; // reset the sound to allow for quick playing
    audio.play();
    playedKey.classList.add('playing');
}
function removeClass(e) {
    if (e.propertyName !== 'transform') return; // to prevent class removal for other property changes
    this.classList.remove('playing');
}
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeClass));
window.addEventListener('keydown', play);
