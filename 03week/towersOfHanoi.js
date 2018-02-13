'use strict';

/*
***WHITEBOARD***
TOWERS OF HANOI
OBJECTIVE: Move the tower from stack a to stack c, allowing the stack to only be ordered in descending orders [3,2,1], and report a win

GAME RULES:
1. Move only one number at a time.
2. A larger number may not be placed ontop of a smaller number.
3. All numbers, except the one being moved, must be on a peg.
4. A win is determined when stack c is stacked smallest to largest 

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
towersOfHanoi accepts a startStack and endStack from the user.  If the input matches the valid inputs, then begin to move the piece 

movePiece accepts the inputs from towersOfHanoi, tests if the move is legal.  If legal, pops the last value of the startStack to the lastValueOfStartStack 
and pushes the popped value to the end of the endStack and checks for a win by passing the inputs to the Check for Win function.
  If not legal, then return an error message.

isLegal accepts inputs from movePiece and should validate that the array of the passed start and end stack is either empty

checkForWin function will check stack c to see if there is a win by testing if the length of the stack is === 4.  The arrangement is handled by other functions, therefore
additional validation on this function is not necessary
    Returns Boolean by testing the length of the the array on stack c

resetBoard is ran once a win is reported and will ask the user if they want to play again.  Based on a user input of
Y or N, the game will either reset the board and loop into getPrompt [Y], or exit the game using process.exit (a node method)

*/

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Global array so that this is stored to the app once and not compiled everytime the function is called.
const validStackInputs = ['a','b','c'];
//Global variable to handle game counter.  Used let here so that the variable can be updated.
let gameCounter = 1;

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

/*
Function to move the piece.  Uses the push and pop methods to move the startStack last item to 
the end of the endStack column.  When called, calls the gameCounter and adds one.  Returns the 
game move count to the user.
*/
const movePiece = (startStack, endStack) => {
const lastValueOfStartColumn = stacks[startStack].pop()
  stacks[endStack].push(lastValueOfStartColumn)
  return `You've made ${gameCounter ++} move(s)`
}

/*
Function to test if the input stacks are valid.  The destination(endstack) must be empty, or 
the startStackValue must be less than the destination endStackValue. Return boolean uses method
length to get the content count of the object and then compares the passed startStackValue and 
endStackValue 
*/
const isLegal = (startStackValue, endStackValue, endStack) => {
  return stacks[endStack].length === 0 || startStackValue < endStackValue
}

/*
Function to test if there is a win by testing the length of the final stack (stack c). No additional
validation is needed here since the legality is tested in other functions.
*/
const checkForWin = () => {
  return stacks.c.length === 4 
}

/*
This helper function takes in an array and the passed input from the user to obtain
truthiness.  This is utilized by the towersOfHanoi function.
*/
const inputLetterTest = (startStack, endStack) => {
   return validStackInputs.indexOf(startStack) !== - 1 && validStackInputs.indexOf(endStack) !== -1
}

/*
The towersOfHanoi function accepts the inputs from getPrompt to play the game. This function passes
the params up the chain to test if the inputs are a,b, or c, and if isLegal then calls the movePiece 
function to handle the move; else not isLega will return an error, or an error message to the user in the event 
the user types any other value than a, b, or c
*/
const towersOfHanoi = (startStack, endStack) => {
  if (inputLetterTest (startStack, endStack)) {
    const startStackValue = stacks[startStack][stacks[startStack].length-1];
    const endStackValue = stacks[endStack][stacks[endStack].length-1];
    if (isLegal(startStackValue, endStackValue, endStack)){
      return movePiece(startStack, endStack)
    }else{
      return `The move is illegal. Stack ${startStack} cannot be greater than Stack ${endStack}'s value.  Please try again.`
    }
  }else{
    return 'Input is invalid'
  }
}

/*
Function to reset the game after a win is reported.  The getWinnerResponsePrompt calls this function
if the user types a Y into the console.  Else, exit the game.  The function will take the response
from the user (getWinnerResponsePrompt) and when Y, the stacks are reset and getPrompt function is called
else process.exit is used to exit the console.
*/
const resetBoard = (response) =>{
  response.trim().toUpperCase() === 'Y' 
  ? (stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  }, getPrompt())
  : process.exit()
}

/*
Function to handle when a win is reported.  Purpose of this function is when called, take in the user's 
response of Y or N and pass to the resetBoard function to handle the next step in the game.
*/
const getWinnerResponsePrompt = () => {
  rl.question('WINNER!!! Play again? [Y][N]: ', (response) => {
    resetBoard(response);
  });
}

/*
Function to prompt the user for input of start and end stack.  Each time the user inputs the prompt
values, checkForWin() function is tested for truthiness.  While falsy, run getPrompt fuction,
else run the getWinnerResponsePromt to handle next steps.
*/
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      console.log(towersOfHanoi(startStack, endStack));
      checkForWin() ? getWinnerResponsePrompt() : getPrompt();
    });
  });
}

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should return Input is invalid to the user if any letter other than a, b, c is passed into the function', () => {
      assert.equal(towersOfHanoi('a', 'd'), 'Input is invalid');
      assert.equal(towersOfHanoi('d', 'e'), 'Input is invalid');
    });
    it('should only allow stacking in decsending order', () => {
      stacks = { a: [1], b: [], c: [4, 3, 2] }
      assert.equal(isLegal(2,1,'a'), false);
      assert.equal(isLegal(2,[],'b'), true);
    });
    it('should return a win when the stack is fully moved to stack c', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [], c: [4, 3, 2] };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();
}
 


