import React, { Component } from 'react'
import '../Styles/Board.css'

export default class Board extends Component{

/*
The rendor method below returns a row with 3 columns
each column is assigned an onClick through a passed prop from the parent component
and assigns each data column with the rowid plus it's column id.  This is used to know
what square is clicked in the handleTicTacToe method
*/
    render() {
        const renderSquare = (colID) =>{
            return (
                <div data-col={this.props.rowNum + colID.toString()} onClick={this.props.move}>
                    <p>{this.props.piece[colID]}</p>
                </div>
            )
        }
        return(
            <div className="row" data-row={this.props.rowNum}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
        )
    }
} 

