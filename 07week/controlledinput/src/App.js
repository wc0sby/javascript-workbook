import React, { Component } from 'react';
import './App.css';
import ListContainer from './ListContainer'

class App extends Component {
  constructor(props){
    super(props) 
      this.state={
        inputValue: '',
        list: []
      }
    }
    
    handleInputChange = (e) =>{
      this.setState({inputValue: e.target.value})
    }

    handleClickSubmit = (e) => {
      const tempList = [...this.state.list]
      tempList.push(this.state.inputValue)
      this.setState({list: tempList,
        inputValue: ''})
    }

  render() {
    return (
      <div>
        <input type="text" value={this.state.inputValue} onChange={this.handleInputChange}/>
        <button onClick={this.handleClickSubmit}>Submit</button>
        <ListContainer/>
      </div>
    );
  }
}

export default App;
