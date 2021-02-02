const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false}) //returns a promise
        .then(localMediaStream => {
            console.log(localMediaStream);
            // support for window.URL.createObjectURL() is being disabled by new browsers
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log(`OH NO!!!`, err);
        });
}

getVideo();
