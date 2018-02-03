import React, { Component } from 'react';
import logo from './logo.svg';
import './Board.css';




class Board extends Component {

  render() {

    let squares =[];
    for(let row = 8; row >= 1; row--) {
      for(let col = 1; col <= 8; col++) {
        if ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)) { squares.push({loc: 11, colour: 'square black',},) }
        if ((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) { squares.push({loc: 12, colour: 'square white',},) }
      };
    };

    return (



          <div>

            {squares.map((item)=>
            <div className={item.colour}></div>)}
            </div>



    );
  }
}


export default Board;
