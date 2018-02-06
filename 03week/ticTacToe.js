'use strict';

/*
WHITEBOARD:

Objective: Create TicTacToe using the provided functions:
ticTacToe( row, column )
checkForWin ( )
diagonalWin ( )
verticalWin ( )
horizontalWin ( )

Rules: 
User cannot play in a taken space (or “ “ space)
If space is open play X lays down marker
Check for a win; if there’s a win, print player X wins
Else change player to O and repeat steps

Things TicTacToe does
2 players alternate turns ( x and o )
Player inputs location they want to place their piece ( row, column )
Checks for a play in location
Checks for a win
Use diagonalWin, verticalWin, and horizontalWin to check winning places
Prints the input

Functions:
TicTacToe ( ) 
Run the checkForWin ( ) function and return true false.
If not, print result and switch player piece 
checkForWin ( )
Will compare the row and column values passed into ticTacToe( ) against current board index
If there isn’t a value here, check for a win using one of the Win functions (check for an empty [falsey value]
DiagonalWin( )
Win Possibilities
board[0][0] \
board[1][1] \
board[2][2] \
board[2][0] /
board[1][1] /
board[0][2] /
VerticalWin ( ) 
Win Possibilities
board[0][0]
board[1][0]
board[2][0]
board[0][1]
board[1][1]
board[2][1]
board[0][2]
board[1][2]
board[2][2]
What’s the common denominator?
board[x] changes, but board[x][0] || board[x][1] || board[x][2]
For each array, loop the inner array to test for a match 

HorizontalWin ( ) — use array method .every and callback to test the input
Win Possibilities
board[0][0]
board[0][1]
board[0][2]
board[1][0]
board[1][1]
board[1][2]
board[2][0]
board[2][1]
board[2][2]

Methods: Primarily utilizing array methods
array.every([callback]) to check if every value in the given array is equal
array.forEach([callback]) ( may have to utilize for loop for time sake )

Variables:
playerTurn [global] = will hold the current player turn and will alternate.  All functions will access the current player
*/

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

/*
playerTurn is a global variable that holds the current player peice value (x/o).
Each function has access to the variable for testing array indexing.
Init value is set to X as this is the first player
*/
let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

/*
Returns Boolean
horizontalWins function uses the every method to callback the gameMarker function which tests if
the peice passed into the gameMarker function is the same as the playerTurn value.  If all are indexes
are the same, then the every method will return true else false. 
*/
const horizontalWin = () => {
  return board[0].every(gameMarker) || 
    board[1].every(gameMarker) || 
    board[2].every(gameMarker)
}

const gameMarker = (peice) => {
  return peice === playerTurn
}

/*
Returns Boolean
verticalWin function uses a for loop to cycle through the 3 inner arrays to test if
the values within the main array is true.
TODO: Change this to a more efficient and better array method
*/
const verticalWin = () => {
  for (let i = 0; i < board.length; i++) {
    if(board[0][i]===playerTurn || 
      board[1][i]===playerTurn || 
      board[2][i]===playerTurn) {
        return true
    }
  }
}

/*
Returns Boolean
diagnalWin tests the win possibilities directly for diagonals
*/

function diagonalWin() {
  return board[0][0] && board[1][1] && board[2][2] === playerTurn ||
    board[0][2] && board[1][1] && board[2][0] === playerTurn
}

/*
Returns Boolean
checkForWin function compares the results of the three primary tests 
*/
function checkForWin() {
  return diagonalWin() || horizontalWin() || verticalWin()
}

/*
ticTacToe function tests if the passed params is available for a play
When the space isn't available, an error message is displayed.  However, when available
the player's piece is place at the passed input and the player piece is updated, then 
the app checks for a win.  If a win is detected, a winner message appears
*/
const ticTacToe = (row, column) => {
  if (board[row][column] !== ' '){
  console.log("There's already a game peice here.  Try again")
  }else{
    board[row][column] = playerTurn
    if (checkForWin()) {
      console.log(`${playerTurn} wins!!!`)
      playerTurn === 'X' ? playerTurn = 'O' : playerTurn = 'X'
    }
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
 }



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
