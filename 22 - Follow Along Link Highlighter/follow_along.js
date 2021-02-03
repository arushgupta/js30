const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    // adding scrollX and scrollY to account for window scroll before
    // highlighting the hovered text
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    };
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

// making first navigation item the start point of highlight rather than (0,0)
// get coordinates of first nav item
const startPoint = document.querySelector('li').firstChild.getBoundingClientRect();
// account for window scroll
const updatedStart = {
    top: startPoint.top + window.scrollY,
    left: startPoint.left + window.scrollX
};
highlight.style.transform = `translate(${updatedStart.left}px, ${updatedStart.top}px)`;

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
