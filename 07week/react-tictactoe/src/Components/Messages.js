import React, { Component } from 'react'


export default class Messages extends Component{
// constructor(props){
//     super(props)
//     messageDecider = () => {
//             !this.props.winStat 
//             ? `It's player {this.props.player}'s turn`
//             : `Player {this.props.player} wins!`
//         }
//     }
    render(){
        return(
            <h2>It's player {this.props.player}'s turn</h2>
        )
    }
}