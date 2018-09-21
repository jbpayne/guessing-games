const readline = require('readline');
const readlineInterface = readline.createInterface(
  { input: process.stdin, output: process.stdout }
);

let maxRange;
if (!process.argv[2]) {
    maxRange = 100;
} else {
  maxRange = +process.argv[2];
}

let guessRange = [1, maxRange];
let tries = 0;

let guess;
const updateGuess = () => {
  tries ++;
  guess =  Math.round((guessRange[0] + guessRange[1] - 1) / 2);
  if (guess === 0) { guess = 1 }
};

updateGuess();

ask = questionText => new Promise((resolve, reject) => {
  readlineInterface.question(questionText, resolve);
});

const start = async () => {
  while (true) {
    if (guessRange[1] - guessRange[0] === 0) {
      console.log(`It is ${guess}!`);
      console.log(`I guessed it in ${tries} tries.`);
      process.exit();
    };
    let yesNo = (await ask(`Is it... ${guess}? `)).toUpperCase();
    if (yesNo === 'N') {
      if (guessRange[1] - guessRange[0] === 1) {
        console.log(`It is ${guess+1}!`);
        console.log(`I guessed it in ${tries} tries.`);
        process.exit();
      };
      let highLow = (await ask('Is it higher (H), or lower (L)? ')).toUpperCase();
      if (highLow === 'H') {
        guessRange[0] = guess + 1;
        updateGuess();
      } else if (highLow === 'L') {
        guessRange[1] = guess - 1;
        updateGuess();
      } else {
        console.log('Please enter H/L');
      }
    } else if (yesNo === 'Y') {
      console.log(`Your number was ${guess}!`);
      console.log(`I guessed it in ${tries} tries.`);
      process.exit();
    } else {
      console.log('Please enter Y/N');
    };
  };
};

console.log(`Please think of a number between 1 and ${guessRange[1]} (inclusive)`);
console.log(`I will try to guess it.`);

start();