const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(e) {
    let inBetween = false;
    if (e.shiftKey && this.checked) {
        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) inBetween = !inBetween;
            if (inBetween) checkbox.checked = true;
        });
    }
    if(!this.checked) {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) lastChecked = checkbox;
        });
    } else {
        lastChecked = this;
    }
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
