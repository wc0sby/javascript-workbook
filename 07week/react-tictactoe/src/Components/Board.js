import React, { Component } from 'react'
import '../Styles/Board.css'

export default class Board extends Component{


    render() {
        return(
            <div className="row" data-row={this.props.rowNum}>
                <div data-col={this.props.rowNum + "0"}>{this.props.piece[0]}</div>
                <div data-col={this.props.rowNum + "1"}>{this.props.piece[1]}</div>
                <div data-col={this.props.rowNum + "2"}>{this.props.piece[2]}</div>
            </div>
        )
    }
} 

