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

const isTheInputValid = (hand1, hand2) => {
  let hand1Lower = hand1.toLowerCase().trim();
  let hand2Lower = hand2.toLowerCase().trim();
  let choiceArray = ['rock','paper','scissors'];
    if (choiceArray.includes(hand1Lower) === true && choiceArray.includes(hand2Lower) === true) {
      console.log( rockPaperScissors(hand1Lower, hand2Lower) );
    }else{
      console.log("Invalid Input: Acceptable responses: Rock, Paper, Scissors");
    }
}

const rockPaperScissors = (convertedHand1, convertedHand2) => {
    if (convertedHand1 === convertedHand2){
      return "it's a tie"
    }else if (convertedHand1 === "rock" && convertedHand2 === "scissors" ||
        convertedHand1 === "scissors" && convertedHand2 === "paper" ||
        convertedHand1 === "paper" && convertedHand2 ==="rock") {
      return "User 1 wins"
    }else{
      return "User 2 wins"
    }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      isTheInputValid(answer1, answer2);
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
