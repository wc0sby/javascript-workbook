'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// User1 input of rock, paper, or scissors.
// User2 input of rock, paper, or scissors.

// Compare User1 input to User2 input.
// If User1 input is 'rock' and User2 input is 'scissor', User1 wins.
// If User1 input is 'rock' and User2 input is 'paper', User2 wins.
// If User1 input is 'rock' and User2 input is 'rock', it's a tie.
// If User1 input is 'paper' and User2 input is 'rock', User1 wins.
// If User1 input is 'paper' and User2 input is 'scissors', User2 wins.
// If User1 input is 'paper' and User2 input is 'paper', it's a tie.
// If User1 input is 'scissors' and User2 input is 'paper', User1 wins.
// If User1 input is 'scissors' and User2 input is 'rock', User2 wins.
// If User1 input is 'scissors' and User2 input is 'scissors', it's a tie.

/*
  The getPrompt function handles the user prompts using redline.  Redline
  question asks for response and return an answer (answer1 = user1 and
  answer2 = user2). After the answer1 and answer2 is collected, we pass
  these responses as params to isTheInputValid

  Write the function [isTheInputValid] that takes the two answers from getPrompt
  function which errorchecks the prompts from user to see if their values are either
  Rock, Paper, or Scissors.  When true, pass the responses from getPromt
  (converted to lowercase) to the rockPaperScissors Function as params hand1,
  hand2, else return an error message.

  Create an if statement called rockPaperScissors; test for tie first, then test
  for user1 win scenarios, else user2 wins
*/
const choiceArray = ['rock','paper','scissors'];

const isTheInputValid = (hand1, hand2) => {
  if (choiceArray.indexOf(hand1) !== -1 &&
      choiceArray.indexOf(hand2) !== -1) {
    return true;
  }else {
    return false;
  }
}

const rockPaperScissors = (hand1, hand2) => {
  const hand1Lower = hand1.toLowerCase().trim();
  const hand2Lower = hand2.toLowerCase().trim();
  if (isTheInputValid(hand1Lower, hand2Lower)) {

    if (hand1Lower === hand2Lower){
      return "It's a tie!"
    }else if (hand1Lower === "rock" && hand2Lower === "scissors" ||
        hand1Lower === "scissors" && hand2Lower === "paper" ||
        hand1Lower === "paper" && hand2Lower ==="rock") {
          console.log(hand1Lower, hand2Lower);
      return "Hand one wins!"
    }else{
      return "Hand two wins!"
    }

  }else {
    return "Invalid Input: Acceptable responses: rock, paper, scissors";
  }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log(rockPaperScissors(answer1, answer2));
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
      assert.equal(rockPaperScissors('paper', 'rock'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors', 'paper'), "Hand one wins!");
      assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");      
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}

if (typeof describe === 'function') {

  describe('#isTheInputValid', () => {
    it('should only allow input of rock, paper, scissors', () => {
      assert.equal(rockPaperScissors('scissor', 'paper'), "Invalid Input: Acceptable responses: rock, paper, scissors");
    });
  });
} else {

  getPrompt();

}
