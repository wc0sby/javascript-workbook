'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Checker {
  constructor(peice){
    this.symbol = peice === 'black' ? 'B' : 'R'
     //need a function here to get the peice location
  }
}

class Board {
  constructor(){
    this.grid = [];
    // this.checkers = [];
    // creates an 8x8 array, filled with null values
  }

  getCheckerStartingPositions(){

    // const redChecker = new Checker('red')
    // const blackChecker = new Checker('black')
    //This array is used to hold the number of columns on the board
    const boardColArr = [0, 1, 2, 3, 4, 5, 6, 7]
    
    //Function to test for even values
    const isEven = (num) => {
      return num % 2 === 0
    }
   //Function that returns the beginning location of the game of checkers
    const getPair = (arr, callback) =>{
      const checker = {
        black: {
          position: arr.filter((num)=>{
          return num < 3 
          }),
          piece: new Checker('black')
        },
        red: {
          position: arr.filter((num)=>{
          return num > 4
          }),
          piece: new Checker('red')
        }
      }
      // const blackArr = arr.filter((num)=>{
      //   return num < 3 
      // })
      // const redArr = arr.filter((num)=>{
      //   return num > 4
      // })
    //Loop through filtered array
    Object.keys(checker).forEach((color)=>{
      checker[color]['position'].forEach((row)=>{
        arr.forEach((col)=>{
          callback(col) && callback(row) || !callback(row)&&!callback(col)
          ? this.grid[row][col] = checker[color]['piece']
          : ''
        })
      })
    })
  }


      // filterArr.forEach((rowNum)=>{
      // //Test if each row number is even or odd
      //   callback(rowNum)
      //     ?arr.forEach((num)=>{
      //       if(callback(num)){
      //         this.grid[rowNum][num] = redChecker
      //       }
      //     })
      //     :arr.forEach((num)=>{
      //       if(!callback(num)){
      //         this.grid[rowNum][num] = blackChecker
      //       }
      //     })
      // })
    
    
    getPair(boardColArr,isEven)
    // blackStartPositions.forEach((position,i)=>{
    //   let blackLoc = position
    //   let blackRow = blackStartPositions[i][0]
    //   let blackCol = blackStartPositions[i][1]
    //   console.log(blackLoc)
    //   this.checkers.push(blackChecker)
    //   this.grid[blackRow][blackCol] = blackChecker
      // console.log(position)
    // })
// console.log(this.grid)
// console.log(row, col)

  }

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
