import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let squares =[];
for(let row = 8; row >= 1; row--) {
  for(let col = 1; col <= 8; col++) {
    if ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)) { squares.push({loc: 11, colour: 'square black',},) }
    if ((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) { squares.push({loc: 12, colour: 'square white',},) }
  };
};


class App extends Component {

  render() {

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">shallow blue</h1>
        </header>

          <div>
            
            {squares.map(function() {

              for(let row = 8; row >= 1; row--) {
                for(let col = 1; col <= 8; col++) {
                  if ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)) { return <div className="square black"></div> }
                  if ((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) { return <div className="square black"></div>  }
                };
              };

            }.bind(this))}




          </div>

      </div>

    );
  }
}



export default App;
