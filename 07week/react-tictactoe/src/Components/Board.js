import React, { Component } from 'react'
import '../Styles/Board.css'

export default class Board extends Component{


    render() {
        return(
            <div className="row" data-row={this.props.rowNum}>
                <div data-col="0"></div>
                <div data-col="1"></div>
                <div data-col="2"></div>
            </div>
        )
    }
} 

