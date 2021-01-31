const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
console.log("Sorted the following list without articles: ", bands);

function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}

// the strip() allows us to remove all of the the articles in the beginning
// and using it in the if statement allows us to compare stripped values without
// making changes to the actual data
const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

//.join('') is needed because otherwise the list of strings returned by
// map will get converted into a string with commas in it
document.querySelector('#bands').innerHTML =
    sortedBands.map(band => `<li>${band}</li>`).join('');
