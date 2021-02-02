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

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    // The following two lines of code will mirror the video and canvas
    video.style.cssText =
        '-moz-transform: scale(-1, 1); \
         -webkit-transform: scale(-1, 1); \
         -o-transform: scale(-1, 1); \
         transform: scale(-1, 1); \
         filter: FlipH;';
    canvas.style.cssText =
        '-moz-transform: scale(-1, 1); \
         -webkit-transform: scale(-1, 1); \
         -o-transform: scale(-1, 1); \
         transform: scale(-1, 1); \
         filter: FlipH;';
    // Take an image from webcam and paint on the canvas
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take pixel data out
        let pixels = ctx.getImageData(0, 0, width, height);
        // apply the effect
        //pixels = redEffect(pixels);

        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;

        //pixels = greenScreen(pixels);

        // re-assigning the context the edited pixels
        ctx.putImageData(pixels, 0 , 0);
    }, 16);
}

function takePhoto() {
    // play camera sound
    snap.currentTime = 0;
    snap.play();
    // take photo
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 100] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 150] = pixels.data[i + 2]; // BLUE
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};
    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });
    for (i = 0; i < pixels.data.length; i+= 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
