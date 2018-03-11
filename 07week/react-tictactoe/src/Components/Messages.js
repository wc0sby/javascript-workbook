import React, { Component } from 'react'


export default class Messages extends Component{

    render(){
       const msgStyles = {
           color: 'White',
           textShadow: 'purple -3px 2px 15px, purple 3px -2px 15px'
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