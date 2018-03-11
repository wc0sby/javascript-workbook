import React, { Component } from 'react'


export default class Messages extends Component{

    render(){
        //basic styles for the messageboard
       const msgStyles = {
           color: 'White',
           textShadow: 'purple -3px 2px 15px, purple 3px -2px 15px'
       }
       //function to help decide on the message output on the message board
       const renderMsgDecider = () =>{

            return (
            //if the winFlag (passed from parent state) is true
            this.props.winFlag
            //report the winner with the player piece
            ? `Player ${this.props.player} wins!!!`
            //else test if ther is a scratch
            : this.props.scratchFlag
            //if scratch flag is true, then report Scratch
                ?`Scratch!`
                //else return the current player's turn
                :`It's player ${this.props.player}'s turn`
            )
        }
        return(
            <h2 style={msgStyles}>{renderMsgDecider()}</h2>
        )
    }
}