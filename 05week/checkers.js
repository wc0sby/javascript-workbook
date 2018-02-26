'use strict';

/*
---WHITEBOARD---
  GOAL: Build checkers using knowledge of classes and objects
  RULES:
    1. Player alternates turns after each valid move
    2. Only can progress 1 forward and 1 L/R if no player is in destination position
    3. Player may jump a player if space is available 2 up and 2 L/R
    4. Winner reported win no more available moves
        ---TBD
  TESTS:
    1. It should have a board
    2. It should have 24 checkers
    3. It should be able to move a checker
    4. It should be able to jump over and kill another checker
  IDEAS:
    1. Create a method for the startng points that will:
      a. Hold all points where the array begins
      b. assign piece to the checker class
      c. push piece to the board
    2. Create an object to hold properties of the checker to define it's shape as needed
      a. direction
      b. color
      c. start points
    3. Identify Pattern for starting points and calculate using functions/methods
    
  PATTERNS:
    Player 1 (B): Even rows are assigned to Odd col and vice versa
      Positions:
          01  10  21
          03  12  23
          05  14  25
          07  16  27
    Player 2 (R): Odd rows are assigned to Even col and vice versa
      Positions:
          70  61  50
          72  63  52
          74  65  54
          76  67  56
*/

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const boardRowColArr = [0, 1, 2, 3, 4, 5, 6, 7]

class Checker {
  constructor(peice){
    this.symbol = peice === 'black' ? 'B' : 'R'
     //need a function here to get the peice location
  }
}
class Board {
  constructor(){
    this.grid = [];
    this.checkers = []
    /*This creates an object to define the attributes of the checker property.  
    Each player has it's own position, piece, color, and progression
    */
   this.checker = {
     player1: {
       position: boardRowColArr.filter((num)=>{
         return num < 3 
        }),
        piece: new Checker('black'),
        color: 'Black',
        progression: 1
      },
      player2: {
        position: boardRowColArr.filter((num)=>{
          return num > 4
        }),
        piece: new Checker('red'),
        color: 'Red',
        progression: -1
      }
    }
  }
  
  //method was created to calculate checker positons and get them to the grid(board)
  checkerStart(){
    //This array is used to hold the number of row/columns on the board
    //creates an object to define each checker (position and piece) for each color
    //Function to test for even values (to be used as callback)
    const isEven = (num) => {
      return num % 2 === 0
    }
    //Function that returns the beginning location of the game of checkers, accepts 
    //array and callback functions above
    const getPair = (arr, callback) =>{
      /*uses the checker object keys to cycle colors, once the color key is obtained,
      it gets the position of the color, which is the filtered array.  It then cycles the 
      the column/row within the filter array to join the even col to even row and odd col to 
      odd row. If true, assign the checker object piece of the currrent color to the grid,
      else return an empty string
      */
     Object.keys(this.checker).forEach((color)=>{
       this.checker[color]['position'].forEach((row)=>{
         arr.forEach((col)=>{
           !callback(row) && callback(col) || callback(row) && !callback(col)
           ? (this.grid[row][col] = this.checker[color]['piece'],
           this.checkers.push(this.checker[color]['piece']))
           : ''
          })
        })
      })
    }
    
    getPair(boardRowColArr,isEven)
  }
  
  // creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(this.grid.symbol); 
      }
    }
  };
  
  // prints out the board
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row]; 
      // a loop within a loop
      for (let column = 0; column < 8; column++) {        
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  };

}
class Game {
  constructor(){
    this.board = new Board();
    this.playerTurn = this.board.checker.player2
  }
  start(){
    this.board.createGrid();
    this.board.checkerStart();
    }
  /*
The moveChecker class takes in the start and end coordinates from getPrompt.  It checks
to see if the inputs are valid, if the direction passed is correct for the player, and determines
the type of move.  When just a single move is passed, then the the checker moves, otherwise, it 
runs a jump.  The jump, which also calles on the move to transfer the piece but adds the ability 
to also kill off an opponents piece.
  */
  moveChecker(start, end){
    //variables for handling coordinates - used throughout the method in subfunctions
    const forInputs = (start+end).split('')
    const startPos = start.split('')
    const endPos = end.split('')

    //Returns Boolean.  Tests the inputs to verify they are between 0 and 7
    const isInputLegal = (inputsArr) =>{
      return inputsArr.every((inputNum) => {
        return Number(inputNum) > -1 && Number(inputNum) < 8
      })
    }
    
    //Returns Boolean.  Tests to see if the direction of the playerTurn is correct by calling on the 
    //progression prop from checker
    const isCorrectDirection = (player) =>{
      return player.progression===Math.sign(endPos[0]-startPos[0])
    }

    /*
    Performs the basic move when not jumping.  Tests the end position's truthiness.  When not falsey, 
    the piece moves and sets the old location to null.  Else, a piece is already in place is returned
    to the user in the console.
    */
    const takeStandardMove = () =>{
      !this.board.grid[endPos[0]][endPos[1]]
      ? (this.board.grid[endPos[0]][endPos[1]] = this.board.grid[startPos[0]][startPos[1]],
        this.board.grid[startPos[0]][startPos[1]] = null)
      : console.log(`There's a piece already here`)
    }

    /*
    Handles jump by creating an array value based on the variance of start and end position coordinates.
    When called, the takeStandardMove is called to make the basic move, but then the jumpArr is populated
    and then passed to the grid to drop off the jumped piece.  Finally, the checker array is decremented.
    */
    const takeJump = () =>{
      const jumpArr = []
      takeStandardMove()
      jumpArr.push(Number(endPos[0])-1)
      jumpArr.push(Number(endPos[1])+Math.sign(startPos[1]-endPos[1]))
      this.board.grid[jumpArr[0]][jumpArr[1]] = null
      this.board.checkers.pop()
    }

    /*
    When the isInputLegal and isCorrectDirection functions are both true, the proceedWithMove function is 
    called.  This function tests the type of move passed into the moveChecker method.  If the coordinates
    return a difference >1, then the takeJump function is called.  Otherwise a standard move is performed.
    */
    const proceedWithMove = () =>{
      Math.abs(Number(startPos[0])-(Number(endPos[0]))) > 1 &&
      Math.abs(Number(startPos[1])-(Number(endPos[1]))) > 1
      ? takeJump()
      : takeStandardMove()
    }
    
    /*
    The following is the action called on the moveChecker method.  When isInputLegal and isCorrectDirection
    are true, the proceedWithMove function is called and the playerTurn alternates.  Else invalid input is
    printed in the terminal to the user.  This continues until a valid input is passed.
    */
    isInputLegal(forInputs) && isCorrectDirection(this.playerTurn) 
    ? (proceedWithMove(), 
      this.playerTurn === game.board.checker.player2
      ? this.playerTurn = game.board.checker.player1
      : this.playerTurn = game.board.checker.player2)
    : console.log('Invalid Input')
  }
}

const getPrompt = () => {
  game.board.viewGrid();
  console.log(`${game.playerTurn.color}'s Move...`)
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}