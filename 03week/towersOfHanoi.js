'use strict';

/*
***WHITEBOARD***
TOWERS OF HANOI
OBJECTIVE: Move the tower from stack a to stack c, allowing the stack to only be ordered in descending orders [3,2,1], and report a win

GAME RULES:
1. Move only one number at a time.
2. A larger number may not be placed ontop of a smaller number.
3. All numbers, except the one being moved, must be on a peg.

Things the game does:
1. User inputs a beginning stack (from) and ending stack (destination)
    a. test the input from the user to verify the input is one of the allowed strings
2. If the destination stack's last value is < beginning stack, then the value is placed at the end of the destination stack
    a. else, the user is returned a message letting them know the move was illegal
3. When stack c has a length of 4 items in descending order, the game will 
        i. return a win
        ii. reset the board
    a. Else, the user will continue playing until a win is reported


Variables:
- validStackInputs: [array] - holds the valid inputs allowed 
- lastValueOfStartStack - holds the last value of the starting stack array

Functions:
towersOfHanoi accepts a startStack and endStack from the user.  If the input matches the valid inputs, then test if the inputs are legal

isLegal accepts inputs from towersOfHanoi and should validate that the array is either empty or the last value of the endingStack is greater than the startStack
  if true, then allow the move (pass the start and end to movePiece)
  else, report the illegal move to the user

movePiece accepts the inputs from isLegal, pops the last value of the startStack to the lastValueOfStartStack and pushes the popped value to the end of the endStack
ends by checking for a win by passing the inputs to the Check for Win function

checkForWin function will check stack c to see if there is a win by testing if the length of the stack is === 4.  The arrangement is handled by other functions, therefore
additional validation on this function is not necessary

*/



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

const movePiece = (startStack, endStack) => {
  const lastRing = stacks[startStack].pop()
  stacks[endStack].push(lastRing)
  checkForWin(startStack, endStack) ? console.log('You win!!!') : ''
}

const isLegal = (startStack, endStack) => {
  const startStackValue = stacks[startStack][stacks[startStack].length-1]
  const endStackValue = stacks[endStack][stacks[endStack].length-1]
  return stacks[endStack].length === 0 || startStackValue < endStackValue
    ? movePiece(startStack, endStack)
    : console.log(`The move is illegal.
    Stack ${startStack}'s value of ${startStackValue}, which is greater than
    Stack ${endStack}'s value of ${endStackValue}.  Please try again`)
}

const checkForWin = (startStack, endStack) => {
 return stacks.c.length === 4 
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
  ? isLegal(startStack, endStack)
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

