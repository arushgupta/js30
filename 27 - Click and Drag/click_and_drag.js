const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;


slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    // slider offset is needed so that we get coordinates for position
    // inside the slider and not the page
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});


slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});


slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});


slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault(); // stops selection of text
    const x = e.pageX - slider.offsetLeft;
    // console.log({x, startX});
    const walk = (x - startX) * 3;
    // works but the slider is jumpy
    // slider.scrollLeft = walk;

    // works best as it recalculates the scroll everytime
    slider.scrollLeft = scrollLeft - walk;
});
