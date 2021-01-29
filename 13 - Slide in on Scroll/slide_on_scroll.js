// the debounce function helps to add a delay in execution of the function
// prevents the page from running the checkSlide() on every scroll
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const images = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    //console.log(window.scrollY);
    images.forEach(image => {
        // halfway through the image
        const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
        // offsetTop tells us where the image is from the top of the page
        const imageBottom = image.offsetTop + image.height;
        const isHalfShown = slideInAt > image.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        (isHalfShown && isNotScrolledPast) ? image.classList.add('active'): image.classList.remove('active');
    });
}

window.addEventListener('scroll', debounce(checkSlide));
