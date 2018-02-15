import React, { Component } from 'react';
import logo from './logo.svg';
import Square from './Square';
import './Board.css';

const aBoard = [
  {
    key: 11,
    row: 1, 
    col: 1, 
    colour: "square black", 
    piece: "Rook",
  },
  {
    key: 22,
    row: 2, 
    col: 2, 
    colour: "square white", 
    piece: "Pawn",
  },
  {
    key: 12,
    row: 1, 
    col: 2, 
    colour: "square white", 
    piece: "",
  },
  {
    key: 21,
    row: 2, 
    col: 1, 
    colour: "square black", 
    piece: "",
  },
];


class Board extends Component {

  constructor() {
    super();
    this.buildTheBoard = this.buildTheBoard.bind(this);
    this.buildASquare = this.buildASquare.bind(this);
    this.updateTheBoard = this.updateTheBoard.bind(this);
    this.state = {
      theBoard: [],
    };
}


componentDidMount() {
  let tmpBoard = [];
  this.buildTheBoard(tmpBoard);
  this.setState({
    theBoard:tmpBoard
  });
}



render() {

  return (
    <div>
      { this.state.theBoard.map((item) =>
        <div key={item.key}>
          <Square 
          key={item.key}
          initSquare={item}
          updateTheBoard = {this.updateTheBoard}
          />
        </div>
      )}  
    </div>
  );
  
}

  updateTheBoard(current, target) {
    let pieceMoving = current.piece;
    const futureState = [...this.state.theBoard];
    for(var square = 0; square < futureState.length; square++) {
        if(futureState[square].key === current.key) {
        //  alert("matched"+futureState[square].key);
        //  pieceMoving = futureState[square].piece;
          futureState[square].piece = "...";
        } else if (futureState[square].key === target.key) {
          futureState[square].piece = pieceMoving;
        } else {
          
        }
    }
    this.setState({  
      theBoard:futureState
    }); 
   
  }


  buildASquare(row,col,colour,tmpBoard) {
    var id = row.toString()+col.toString();
    let player;
    if (row <=2) {player = "white"} 
    if (row >=7) {player = "black"} 
    if(row <= 1 || row >=8) {
      switch (col) {
        case 1:
        case 8:
          return tmpBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-Rook",},)
        case 2:
        case 7:
          return tmpBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-Knight",},)
        case 3:
        case 6:
          return tmpBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-Bishop",},)
        case 4:
          return tmpBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-King",},)
        case 5:
          return tmpBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-Queen",},)    
      }
    } else if (row === 2 || row === 7) {
        return tmpBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-Pawn",},)
    } else {
        return tmpBoard.push({key: id, row: row, col: col, colour: colour, piece: "...",},)
    }
  }

  buildTheBoard(tmpBoard) {
    
    for(let row = 8; row >= 1; row--) {
      for(let col = 1; col <= 8; col++) {
        if ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)) { var colour = 'square black'; }
        if ((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) { var colour = 'square white'; }
        this.buildASquare(row,col,colour,tmpBoard);
      };
    };

  }



}


export default Board;
