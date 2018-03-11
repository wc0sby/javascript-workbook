import React, { Component } from 'react';
import './TicTacToe.css';

import Messages from './Components/Messages'
import Button from './Components/Button'
import Board from './Components/Board';

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

  
  getClickedSquare = (e) => {
    const newBoardLayout = [...this.state.boardPosition]
    const position = e.target.dataset.col 
    const piece = this.state.playerTurn

    if (!this.state.isThereAWin){

      if (position && this.checkForEmptySpace(newBoardLayout, position)){
        newBoardLayout[position[0]][position[1]]=piece

        this.checkForWin(newBoardLayout, position, piece)
        ? this.setState({ isThereAWin: true })
        : (this.checkForScratch(this.arrayConversionForScratch(newBoardLayout))===9)
          ?this.setState({isThereAScratch: true})
          :this.setState({ playerTurn: piece === 'X' ? 'O' : 'X' })
      }
    }
  }
  
  checkForEmptySpace = (arr, position) =>{
    return !arr[position[0]][position[1]]
  }

  horizontalWin = (arr, position) =>{
    return arr[position[0]].every((square)=>{
      return square === this.state.playerTurn
    })
  }

  verticalWin = (arr, position) =>{
    return arr.every((row)=>{
      return row[position[1]]===this.state.playerTurn
    })
  }

  diagonalWin = (arr,position, piece) => {
    return arr.every((square, i)=>{
      return square[i] === this.state.playerTurn
    }) ||
     arr[0][2]===piece && arr[1][1]===piece && arr[2][0] === piece
    }

  checkForWin = (arr, position, piece) => {
    return this.horizontalWin(arr, position) ||
      this.verticalWin(arr,position) || 
      this.diagonalWin (arr, position, piece)
  }

  checkForScratch = (callback)=> {
    return callback.reduce((acc, cVal)=>{
      return acc + cVal
    })
  }

  arrayConversionForScratch = (arr) => {
    return arr.map((row)=>{
      return row.filter((square)=>{
        return square !== '' 
        }).length
    })
  }

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TicTacToe</h1>
          <section className="MessageCenter">
            <Messages
              winStat = {this.state.isThereAWin}
              scratchStat = {this.state.isThereAScratch}
              player = {this.state.playerTurn}
            />
            <Button
              winFlag = {this.state.isThereAWin}
              scratchFlag = {this.state.isThereAScratch}
              action = {this.handleButtonPressed}
            />
          </section>
        </header>
          <div>
            <section className="GameBoard" >
              {this.state.boardPosition.map((eachArr, i)=>{
                return (
                  <Board 
                    key = { i }
                    rowNum = { i }
                    piece = { this.state.boardPosition[i]}
                    move = { this.getClickedSquare}
                  />  
                )
              })}
            </section>
          </div>
      </div>
    );
  }
}

export default TicTacToe;