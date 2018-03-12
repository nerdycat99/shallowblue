import React, { Component } from 'react';
import logo from './logo.svg';
import Board from "./Board";

class App extends Component {

  constructor() {
    super();
    this.updateGameState = this.updateGameState.bind(this);
    this.updatePlayersTurn = this.updatePlayersTurn.bind(this);
    this.state = {
      currentPlayer: "white",
      inCheck: "", 
      gameState: [], 
    };
  }   
  
  updateGameState(futureState) {
    this.setState({  
      gameState:futureState
    }); 
  }

  
  updatePlayersTurn(nextPlayer,playerInCheck) {
    this.setState({
      currentPlayer:nextPlayer,
      inCheck:playerInCheck
    })
  }

  setCheck(playerInCheck) {
    this.setState({
      inCheck:playerInCheck
    })
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
            updatePlayersTurn={this.updatePlayersTurn}
            currentPlayer={this.state.currentPlayer}
            inCheck={this.state.inCheck}
          />
        </div>
      );
    }

}

export default App;