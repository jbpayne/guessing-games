const readline = require('readline');
const readlineInterface = readline.createInterface(
  { input: process.stdin, output: process.stdout }
);

let range = 1;
let minRange = 1;
let maxRange = 100;
let tries = 0;
let guess = 1;

if (!process.argv[2]) {
    maxRange = 100;
} else {
  maxRange = +process.argv[2];
}

const setRange = () => {
 range =  maxRange - minRange + 1;
 console.log("minRange =", minRange);
 console.log("maxRange =", maxRange);
 console.log("range =", range);
}


const updateGuess = () => {
  tries ++;
  setRange();
  guess = Math.round((minRange + maxRange - 1) / 2);
  if (guess === 0) { guess = 1 };
};

const checkForWin = () => {
  let yesNo;
  setRange();
  if (range === 0) {
    console.log(`It is ${guess + range}!`);
    console.log(`I guessed it in ${tries} tries.`);
    process.exit();
  }
};

const ask = questionText => new Promise((resolve, reject) => {
  readlineInterface.question(questionText, resolve);
});

const start = async () => {
  while (true) {
    checkForWin();
    let yesNo = (await ask(`Is it... ${guess}? `)).toUpperCase();
    if (yesNo === 'N') {
      checkForWin();
      let highLow = (await ask('Is it higher (H), or lower (L)? ')).toUpperCase();
      if (highLow === 'H') {
        minRange = guess + 1;
        updateGuess();
      } else if (highLow === 'L') {
        maxRange = guess - 1;
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

// Start a new game
console.log(`Please think of a number between 1 and ${maxRange} (inclusive)`);
console.log(`I will try to guess it.`);

updateGuess();
start();