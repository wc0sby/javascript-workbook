import React, { Component } from 'react';
import './TicTacToe.css';

/* 
The following imports 3 components that will handle messages,
the game board, and the reset button.  These can be found
within the components dir
*/
import Messages from './Components/Messages'
import Button from './Components/Button'
import Board from './Components/Board';

//Update class name from app to TicTacToe becase...why not
/*
State will hold the game board array, the player turn piece, and 
a boolean flag on whether there is a win (later added a scratch flag).  
The boolean flags are passed into the Messages and Button components
as props to control outputs to the user. See each component for 
more information as to what each prop is used for.
*/
class TicTacToe extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      boardPosition: [ ['','',''],
                       ['','',''],
                       ['','',''] 
                      ],
      playerTurn: 'X',
      isThereAWin: false,
      isThereAScratch: false
    }
  }

  /*
-----------Game Methods (for moves and legality checks)----------------
  */
  
  /*returns true or false
  Since empty string is falsey, the bang symbol is used to invert to true
  When the clicked value is false, it's returned as true and passed to the
  game move function
  */
  checkForEmptySpace = (arr, position) =>{
    return !arr[position[0]][position[1]]
  }

/*
  returns true or false
  Uses the every array method to test if every value on the clicked row is 
  equal to the current state's playerTurn (x or o)
*/
horizontalWin = (arr, position) =>{
  return arr[position[0]].every((square)=>{
    return square === this.state.playerTurn
  })
}

/*
  returns true or false
  Uses the every method to test the column of the clicked column, on every row
  that is equal to the current state's playerTurn(x or o)
*/
  verticalWin = (arr, position) =>{
    return arr.every((row)=>{
      return row[position[1]]===this.state.playerTurn
    })
  }

/*
  returns true or false
  Or criteria used to compute the direction of the diagonal.
    1. the every method was used to thest the left-top to right-bottom direction
      by adding the index to each rowsquare and testing if the value in each is 
      equal to the playerTurn(passed into function as piece)
    2. the bottom-left to top-right is then tested using hard coded values against
    the playerTurn
*/
  diagonalWin = (arr,position, piece) => {
    return arr.every((square, i)=>{
      return square[i] === piece
    }) ||
     arr[0][2]===piece && arr[1][1]===piece && arr[2][0] === piece
    }

/*
  returns true or false
  Function calls the horizontalWin, verticalWin, and diagonalWin functions.  When one
  of the values equal true, there is a win and the function will return true else false
*/
  checkForWin = (arr, position, piece) => {
    return this.horizontalWin(arr, position) ||
      this.verticalWin(arr,position) || 
      this.diagonalWin (arr, position, piece)
  }

/*
  returns a value 0 - 9
  A callback is passed into this function, which returns an array.  The returned array is
  then has a reduce method applied with the accumulator and current value being added together
  to get the sum of the passed array.  
*/
  checkForScratch = (callback)=> {
    return callback.reduce((acc, cVal)=>{
      return acc + cVal
    })
  }
/*
  returns an array 
  The purpose of this function is to map the passed array and filter the results where the 
  values are not empty strings.  The length of the results are then returned as the new mapped
  array...which is used by the checkForScratch function.
*/
  arrayConversionForScratch = (arr) => {
    return arr.map((row)=>{
      return row.filter((square)=>{
        return square !== '' 
        }).length
    })
  }

  /*
-----------Event Methods-----------------
  */

  /*
  event to get the position by the means of the data-cell from
  the clicked square.  The position is then passed into various game 
  move functions to check for legality.  Once the move is processed
  the player turn will be updated from 'x' to 'o'

  Variables:
    -newBoardLayout will create a shallow copy of the the board array in state
    -position will hold the clicked position (data-cell)
    -piece will hold the current value in state and will be used to alt between 'x' and 'o'

  Functions:
    -checkForWin checks for horizontal, vertical, and diagonal wins
    -checkForScratch checks for a scratch.  This function accepts a callback
      function that filters the array prior to being passed into reduce

  State:
    -The following states will be updated:
      -boardPosition will update on each play
      -piece will toggle x and o if a valid move is made
      -isThereAWin and isThereAScratch will update if a win or scratch is detected
  */
 handleTicTacToeMove = (e) => {
  //creates shallow copy of boardPosition from state
  const newBoardLayout = [...this.state.boardPosition]
  //variable for holding the clicked square's data cell
  const position = e.target.dataset.col 
  //variable for holding the playerTurn piece: used for toggling x and o
  const piece = this.state.playerTurn

  //if there isn't a win on the board
  if (!this.state.isThereAWin){
    //check if the clicked position is not empty and that the position isn't undefined
    if (position && this.checkForEmptySpace(newBoardLayout, position)){
      //when passing, place the gamepiece on the board at the clicked square
      newBoardLayout[position[0]][position[1]]=piece
      //check the board for a win (see above)
      this.checkForWin(newBoardLayout, position, piece)
      //if checkForWin returns true (meaning win) then set the state to true
      ? this.setState({ isThereAWin: true })
      //if not a win, check the board for a scratch (see above)...
      : (this.checkForScratch(this.arrayConversionForScratch(newBoardLayout))===9)
        //if the checkForScratch function returns 9 (meaning 9 squares are full without a win)
        //then set the isThereAScratch state to true
        ?this.setState({isThereAScratch: true})
        //otherwise, there isn't a win or scratch, so alternate the piece from x and o and set state
        :this.setState({ playerTurn: piece === 'X' ? 'O' : 'X' })
    }
  }
}
/*
  When the reset button is clicked, state is reset to the original state
*/
  handleButtonPressed = () => {
    this.setState({
      boardPosition: [ ['','',''],
                      ['','',''],
                      ['','',''] 
                    ],
      playerTurn: 'X',
      isThereAWin: false,
      isThereAScratch: false
    })
  }

  
  
  /*
  -----------Render Methods----------------
  */
 
 render() {

  /*
  The render MessageCenter stands up 2 components: Messages and Button
    1.Messages takes in 3 props (see each component for additional details)
      a.winFlag = passes state to the component for isThereAWin
      b.scratchFlag = passes state to the component for isThereAScratch
      c.player = passes state to the component for playerTurn
    2.Button takes in 3 props (see each component for additional details)
      a.winFlag = passes state to the component for isThereAWin
      b.scratchFlag = passes state to the component for isThereAScratch
      c.action = passes the handleButtonPressed function above
  */

  const renderMessageBoard = () => {
    return (
      <section className="MessageCenter">
      <Messages
        winFlag = {this.state.isThereAWin}
        scratchFlag = {this.state.isThereAScratch}
        player = {this.state.playerTurn}
        />
      <Button
        winFlag = {this.state.isThereAWin}
        scratchFlag = {this.state.isThereAScratch}
        action = {this.handleButtonPressed}
        />
      </section>
    )
  }

  /*
  This render function prints out the board.  It uses the map method to cycle through
  each board position row to create each row on the page.  Passes in the index as the key
  and then creates a secondary rowNum id using the same index for a prop to be used on the component.
  piece prop is used to assign the boardPosition with an index as the the rowNum. Finally the move prop is 
  used to pass the handleTicTacToe method to the board
  */
  const renderGameBoard = () =>{
    return (
      <section className="GameBoard" >
        {this.state.boardPosition.map((eachArr, i)=>{
          return (
            <Board 
            key = {i}
            rowNum = {i}
            piece = {this.state.boardPosition[i]}
            move = {this.handleTicTacToeMove}
            />  
          )
        })}
      </section>
    )
  }

  /*
  ------------------JSX-------------------
  */
  
  return (
    <div className="TTT">
        
        <header className="TTT-header">
          <h1 className="TTT-title">TicTacToe</h1>
          {renderMessageBoard()}
        </header>

          <div>
          {renderGameBoard()}
          </div>

      </div>
    );
  }
}

export default TicTacToe;