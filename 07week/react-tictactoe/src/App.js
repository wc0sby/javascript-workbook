import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
  }

  handleButtonPress=()=>{console.log('here')}

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              Hi World
              </tr>
            </tbody>
          </table>
      </div>
    );
  }
}

export default TicTacToe;
