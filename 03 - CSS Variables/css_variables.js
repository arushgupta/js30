const inputs = document.querySelectorAll('.controls input');

function updateVariables() {
    var suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}
inputs.forEach(input => input.addEventListener('change', updateVariables));
inputs.forEach(input => input.addEventListener('mousemove', updateVariables));
