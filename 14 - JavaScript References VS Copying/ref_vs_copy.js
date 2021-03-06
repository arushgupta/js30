// start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let name = 'Arush';
let name2 = name;
console.log(name, name2);
name = 'Gupta';
console.log(name, name2);

// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
console.log('players: ', players);

// and we want to make a copy of it.
const team1 = players;
console.log('team1: ', team1);

// You might think we can just do something like this:
team1[3] = 'Arush';

// however what happens when we update that array?

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
const team2 = players.slice();
console.log('team2: ', team2);

// one way

// or create a new array and concat the old one in
const team3 = [].concat(players);
console.log('team3: ', team3);

// or use the new ES6 Spread
const team4 = [...players];
team4[3] = 'hee haw';
console.log('team4: ', team4);

const team5 = Array.from(players);
console.log('team5: ', team5);

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object
console.log('players: ', players);

// with Objects
const person = {
    name: 'Wes Bos',
    age: 80
};
console.log('person: ', person);

// and think we make a copy:
const captain = person;
captain.number = 99;
captain.age = 48;
console.log('captain: ', captain);

// how do we take a copy instead?
const cap2 = Object.assign({}, person, {
    number: 101,
    age: 24
});
console.log('captain2: ', cap2);

// We will hopefully soon see the object ...spread
const cap3 = {
    ...person
};
console.log('captain3: ', cap3);
console.log('person: ', person);

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const arush = {
    name: 'Arush',
    age: 201,
    social: {
        twitter: '@gupta_arush',
        github: 'arushgupta'
    }
}
console.log('arush.social.twitter: ', arush.social.twitter);

const dev = Object.assign({}, arush);
const dev2 = JSON.parse(JSON.stringify(arush));
dev2.social.twitter = '@👍';
dev.social.twitter = '@💩';
console.log('dev.social.twitter: ', dev.social.twitter);
console.log('dev2.social.twitter: ', dev2.social.twitter);
console.log('arush.social.twitter: ', arush.social.twitter);
