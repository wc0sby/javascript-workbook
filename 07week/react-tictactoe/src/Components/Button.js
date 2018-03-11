import React, { Component } from 'react'

export default class Button extends Component {

    render(){

        const bttnStyle = {
            width: '175px',
            height: '35px',
            color: 'white',
            background: 'rgba(171, 7, 247, 0.288)',
            fontSize: '20px', 
            borderColor: 'white',
        }

        const renderButton = () => {
            return this.props.winFlag || this.props.scratchFlag
            ? <button style={bttnStyle} onClick={this.props.action}>Reset</button>
            : ''
        }
        return( 
            renderButton()
        )
    }
}