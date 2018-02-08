import React, { Component } from 'react';
import logo from './logo.svg';
import Board from "./Board";

class App extends Component {

    render() {
  
      return (

        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">shallow blue</h1>
        </header>

        <Board />
        


      </div>

      );
    }

}

export default App;