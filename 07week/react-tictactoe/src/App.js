import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      isThereAWin: false
    }
  }

  getClickedSquare = (e) => {
    const newBoardLayout = {...this.state.boardPosition}
    const position = e.target.dataset.col 
    const piece = this.state.playerTurn
      newBoardLayout[position[0]][position[1]]=piece
      this.setState({ playerTurn: piece === 'X' ? 'O' : 'X' })
  }
  
  getIndex = () => {
    console.log(this.props.loc)
  }

  gameMove = (loc, player) =>{

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TicTacToe</h1>
        </header>
        <div >
          <section className="MessageCenter">
            <Messages
              winStat = {this.state.isThereAWin}
              player = {this.state.playerTurn}/>
            <Button/>
          </section>
          <section className="GameBoard" onClick={ this.getClickedSquare }>

          { this.state.boardPosition.map((eachArr, i)=>{
            return (
            <Board 
              key = { i }
              rowNum = { i }
              piece = { this.state.boardPosition[i]}
              gameMove = { this.gameMove }
              />
            )
          }) }
          </section>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
