let maxRange = +process.argv[2]

let guessRange = [1, maxRange];
let tries = 0;

updateGuess = () => {
  tries ++;
  return Math.round((guessRange[0] + guessRange[1] - 1) / 2);
};

let guess = updateGuess();

const readline = require('readline');
const readlineInterface = readline.createInterface(
  { input: process.stdin, output: process.stdout }
);

ask = questionText => new Promise((resolve, reject) => {
  readlineInterface.question(questionText, resolve);
});

const start = async () => {
  while (true) {
    let yesNo = await ask(`Is it... ${guess}? `);
    if (yesNo === 'N') {
      let highLow = await ask('Is it higher (H), or lower (L)? ');
      if (highLow === 'H') {
        guessRange[0] = guess + 1;
        guess = updateGuess();
      } else if (highLow === 'L') {
        guessRange[1] = guess - 1;
        guess = updateGuess();
      } else {
        console.log('Please enter H/L');
      }
    } else if (yesNo === 'Y') {
      console.log('Your number was ' + guess + '!');
      console.log('I guessed it in ' + tries + ' tries.');
      process.exit();
    } else {
      console.log('Please enter Y/N');
    };
  };
};

console.log(`Please think of a number between 1 and ${guessRange[1]} (inclusive)`);
console.log(`I will try to guess it.`);

start();