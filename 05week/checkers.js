'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Checker {
  constructor(peice){
    return this.symbol = 'black' ? 'B' : 'R'
     //need a function here to get the peice location
  }
}

class Board {
  constructor(){
    this.grid = [];
    this.checkers = [];
    // creates an 8x8 array, filled with null values
  }

  getCheckerStartingPositions(row, col){
    //THIS SUCKS...
    //patterin is within this by looking at even and odds...come back to this
    const blackStartPositions = [
      [7,1],[7,3],[7,5],
      [7,7],[6,0],[6,2],
      [6,4],[6,6],[5,1],
      [5,3],[5,5],[5,7]
    ]
    const redStartPositions = [
      [0,0],[0,2],[0,4],
      [0,6],[1,1],[1,3],
      [1,5],[1,7],[2,0],
      [2,2],[2,4],[2,6]
    ]

    const blackChecker = new Checker('black')
    blackStartPositions.forEach((position,i)=>{
      let blackRow = blackStartPositions[i][0]
      let blackCol = blackStartPositions[i][1]
      this.checkers.push(blackChecker)
      this.grid[blackRow][blackCol] = blackChecker
      // console.log(position)
    })
// console.log(this.grid)
// console.log(row, col)

  }

  createGrid() {
    // loop to create the 8 rows

    //**This should allow have a function to loop even/odds */
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

  // Your code here
}
class Game {
  constructor(){
    this.board = new Board();
  }
    start(){
      this.board.createGrid();
      this.board.getCheckerStartingPositions();
      // Your code here
    };
}

const getPrompt = () => {
  game.board.viewGrid();
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
