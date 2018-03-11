import React, { Component } from 'react'

export default class Button extends Component {

    render(){
        //basic bttn styles
        const bttnStyle = {
            width: '175px',
            height: '35px',
            color: 'white',
            background: 'rgba(171, 7, 247, 0.288)',
            fontSize: '20px', 
            borderColor: 'white',
        }
        //decides on when to print the button
        const renderButton = () => {
            return (
                //if the winFlag or scratchFlag props are true
                this.props.winFlag || this.props.scratchFlag
                //display the button with assigned onClick method passed from parent component
                ? <button style={bttnStyle} onClick={this.props.action}>Reset</button>
                //else nothing
                : ''
            )
        }
        return( 
            renderButton()
        )
    }
}