import React, { Component } from 'react';
import logo from './logo.svg';
import Board from "./Board";

class App extends Component {

  constructor() {
    super();
    this.updateGameState = this.updateGameState.bind(this);
    this.state = {
      gameState: [],
    };
  }   
  
  updateGameState(futureState) {
    this.setState({  
      gameState:futureState
    }); 
  }


    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">shallow blue</h1>
          </header>
          <Board 
            gameState={this.state.gameState} 
            updateGameState={this.updateGameState}
          />
        </div>
      );
    }

}

export default App;