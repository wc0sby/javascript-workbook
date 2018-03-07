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
      boardPosition: [ ['o','','o'],
                       ['','','o'],
                       ['','o',''] 
                      ],
      playerTurn: 'X',
      clickedSquare: ''
    }
  }

  getClickedSquare = (e, props) => {
    this.setState({clickedSquare: e.target.dataset.row})
  }
  
  getIndex = (e) => {
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
            <Messages/>
            <Button/>
          </section>
          <section className="GameBoard" onClick={ this.getClickedSquare }>

          { this.state.boardPosition.map((eachArr, i)=>{
            return (
            <Board 
              key = { i }
              rowNum = { i }
              piece = { eachArr[eachArr] }
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
