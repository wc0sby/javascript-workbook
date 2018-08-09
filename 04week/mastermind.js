'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard=()=> {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution=()=> {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt=(min, max)=> {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint=(solution, guess)=> {
  const solutionArray = solution.split('')
  const guessArray = guess.split('')
  let correctLetterLocation = 0
  let correctLetters = 0
  let hint = ''

  // for(let i = 0; i < solutionArray.length; i++){
  //   if (solutionArray[i] === guessArray[i]){
  //     correctLetterLocation += 1
  //     solutionArray[i] = null
  //   }
  // }

  solutionArray.forEach((letter, i)=>{
    if(letter === guessArray[i]){
      correctLetterLocation += 1
      letter = null
    }
  })
  
  // for(let x = 0; x < solutionArray.length; x++){
  //   if(solutionArray.indexOf(guessArray[x]) > -1){
  //     correctLetters += 1
  //   }
  // }

  solutionArray.forEach((letter, i)=>{
    if(solutionArray.indexOf(guessArray[i]) > -1){
      correctLetters += 1
    }
  })

  board.push(guess)
  console.log( `${correctLetterLocation}-hfhjgkfgfh${correctLetters}` )

}

const mastermind=(guess)=> {
  // solution = 'abcd'; // Comment this out to generate a random solution
  board.length === 10 && solution !== guess 
  ? console.log(`You ran out of turns! The solution was ${solution}`) 
  : generateHint(solution, guess)
  
}


const getPrompt=()=> {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
