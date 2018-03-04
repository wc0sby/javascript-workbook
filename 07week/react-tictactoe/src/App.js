import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Messages from './Components/Messages'
import Button from './Components/Button'
import Board from './Components/Board';

class TicTacToe extends React.Component {
  
  // constructor(props) {
  //   super(props);
  // }

  // handleButtonPress=()=>{console.log('here')}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">TicTacToe</h1>
        </header>
        <body>
          <section className="MessageCenter">
            <Messages/>
            <Button/>
          </section>
          <section className="GameBoard">
            <Board/>
          </section>
        </body>
      </div>
    );
  }
}

export default TicTacToe;
