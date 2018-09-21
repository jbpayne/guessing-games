const readline = require('readline');
const readlineInterface = readline.createInterface(
  { input: process.stdin, output: process.stdout }
);

const ask = questionText => new Promise((resolve, reject) => {
  readlineInterface.question(questionText, resolve);
});

let number = Math.ceil(Math.random()*100);

const start = async () => {
  while (true) {
    let playerGuess = await ask(`Enter your guess: `);

    if (playerGuess < number) {
      console.log("Higher");
    }
    if (playerGuess > number) {
      console.log("Lower");
    }
    if (playerGuess == number) {
      console.log(`Yes, ${number} is correct!`);
      process.exit();
    }
  }
}

console.log("I'm thinking of a number between 1 and 100.  Can you guess the number?");


start();
