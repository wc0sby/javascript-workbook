import React, { Component } from 'react'
import '../Styles/Board.css'

export default class Board extends Component{


    render() {
        return(
            <div className="row" data-row={this.props.rowNum}>
                <div data-col={this.props.rowNum + "0"} onClick={this.props.move}>
                    <p>{this.props.piece[0]}</p>
                </div>
                <div data-col={this.props.rowNum + "1"} onClick={this.props.move}>
                    <p>{this.props.piece[1]}</p>
                </div>
                <div data-col={this.props.rowNum + "2"} onClick={this.props.move}>
                    <p>{this.props.piece[2]}</p>
                </div>
            </div>
        )
    }
} 

