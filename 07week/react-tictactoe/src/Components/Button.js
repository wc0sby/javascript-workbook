import React, { Component } from 'react'

export default class Button extends Component {

    render(){

        const bttnStyle = {
            width: '175px',
            height: '25px',
            color: 'white',
            background: 'blue',
            fontSize: '15px'
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