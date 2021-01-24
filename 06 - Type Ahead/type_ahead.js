const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
// fetch() returns a Promise
// We can use then() on Promise to start working on the raw data that has been returned
// The blob returned from then needs to be parsed into json
// The spread helps us to push data into an array without creating nested arrays
const blob = fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}
function numberWithCommas(a) {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function displayMatches() {
    const matches = findMatches(this.value, cities);
    const regex = new RegExp(this.value, 'gi');
    const html = matches.map(place => {
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `<li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                </li>`;
    }).join('');
    suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
//searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
