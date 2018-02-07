'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const validStackInputs = ['a','b','c'];

const stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = () => {
  // Your code here

}

const isLegal = () => {
  // Your code here

}

const checkForWin = () => {
  // Your code here
}

/*
This helper function takes in an array and the passed input from the user to obtain
truthiness.  This is utilized by the towersOfHanoi function.
*/
const inputLetterTest = (inputArr, inputStack) => {
  return inputArr.some((stack) => {
    return stack === inputStack
  })
}

const towersOfHanoi = (startStack, endStack) => {
  (inputLetterTest(validStackInputs, startStack) && 
    inputLetterTest(validStackInputs, endStack)) 
   ? checkForWin()
   : console.log("Input is invalid")
 }


function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should only allow input of a, b, or c', () => {
      ticTacToe(a, e);
      assert.deepEqual(board, false);
    });
    it('should only stack in decsending order', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should return a win when the stack is fully moved to stack c', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
  });
} else {

  getPrompt();
}

