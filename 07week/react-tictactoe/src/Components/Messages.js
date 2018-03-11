import React, { Component } from 'react'


export default class Messages extends Component{

    render(){
       const msgStyles = {
           margin: '0'
       }

       const msgDecider = () =>{
            return this.props.winStat
            ? `Player ${this.props.player} wins!!!`
            : this.props.scratchStat
                ?`Scratch!`
                :`It's player ${this.props.player}'s turn`
        }
        return(
            <h2 style={msgStyles}>{msgDecider()}</h2>
        )
    }
}