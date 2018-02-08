import React, { Component } from 'react';
import logo from './logo.svg';
import './Board.css';
import Square from './Square';
import Piece from './Piece';



class Board extends Component {
  constructor(props) {
    super(props);
    this.constructTheHtml = this.constructTheHtml.bind(this);
}

  render() {

    let squares =[];
    for(let row = 8; row >= 1; row--) {
      for(let col = 1; col <= 8; col++) {
        if ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)) { var colour = 'square black'; }
        if ((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) { var colour = 'square white'; }
        this.constructTheHtml(squares,row,col,colour); 
      };
    };

    return (
      <div>
        { 
          squares.map((item)=>
          <Square squaresFromParent={item}/>)}
          <div>
            <Piece piecesFromParent="hello"/>
          </div>
      </div>
    );
  }

  constructTheHtml(squares,row,col, colour) {
    return squares.push({row: row, col: col, colour: colour,},)
  }

}


export default Board;
