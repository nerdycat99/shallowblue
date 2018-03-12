import React, { Component } from 'react';
import logo from './logo.svg';
import Square from './Square';
import './Board.css';
import {determineOpponentMove} from './OpponentLogic'
import {isOpponentInCheck} from './CheckLogic'
// import reducer from './reducer'

let initialBoard;

class Board extends Component {

  constructor() {
    super();
    this.buildTheBoard = this.buildTheBoard.bind(this);
    this.buildASquare = this.buildASquare.bind(this);
    this.assignPieceDisplay = this.assignPieceDisplay.bind(this);  
    this.movePiece = this.movePiece.bind(this);
    this.moveAI = this.moveAI.bind(this);
    this.highlightSquare = this.highlightSquare.bind(this);
}

componentDidMount() {
  initialBoard = this.props.gameState;
  this.buildTheBoard(initialBoard);
  this.props.updateGameState(initialBoard);
}



render() {
  return (
    <div>
      { this.props.gameState.map((item) =>
        <div key={item.key}>
          <Square 
          //  key={item.key}
            initSquare={item}
            movePiece = {this.movePiece}
            highlightSquare = {this.highlightSquare}
            gameState = {this.props.gameState}
            currentPlayer={this.props.currentPlayer}
          />
        </div>
      )}  
    </div>
  );
}
  dispatch (action /*: Action */) {
//    this.setState(reducer(this.state, action))
  }

  highlightSquare(touchedSquare, onOff, touchedSquareColour) {
    const futureState = [...this.props.gameState];
    for(var square = 0; square < futureState.length; square++) {
      if (futureState[square].key === touchedSquare.key) {
        onOff ? 
          futureState[square].colour = "square moveHighlight"
          :
          futureState[square].colour = touchedSquareColour;
        this.props.updateGameState(futureState);
      }
    }
  }



  movePiece(current, target) {
    let pieceMovingDisplay = current.display;
    let pieceMovingPiece= current.piece;
    const futureState = [...this.props.gameState];
    for(var square = 0; square < futureState.length; square++) {
        if(futureState[square].key === current.key) {
          futureState[square].display = "";
          futureState[square].piece = "";
        } else if (futureState[square].key === target.key) {
          futureState[square].display = pieceMovingDisplay;
          futureState[square].piece = pieceMovingPiece;
        } else {
          // no action
        }
    }
    if (isOpponentInCheck(target,this.props.gameState)) {
      alert("your opponent is in check!");
    } 
    this.props.updateGameState(futureState);
    this.props.updatePlayersTurn("black","");

    let opponentMove = determineOpponentMove(this.props.gameState);
    this.moveAI(opponentMove[0],opponentMove[1]);
  
  
  }

  moveAI(current, target) {
    let pieceMovingDisplay = current.display;
    let pieceMovingPiece= current.piece;
    let opponentsKing;
    const futureState = [...this.props.gameState];
    for(var square = 0; square < futureState.length; square++) {
        if(futureState[square].key === current.key) {
          futureState[square].display = "";
          futureState[square].piece = "";
        } else if (futureState[square].key === target.key) {
          futureState[square].display = pieceMovingDisplay;
          futureState[square].piece = pieceMovingPiece;
        } else if ((futureState[square].piece).substring(6) === "King" && (futureState[square].piece).substring(0,5) != (current.piece).substring(0,5)) {
          opponentsKing = futureState[square];
        } else {
          // no action
        }
    }
    if (isOpponentInCheck(target,this.props.gameState)) {
      alert("you are in check!");
      // run code to pass the square of the King to highlight that Square
      // this players King
    //  highlightSquare(opponentsKing, false, touchedSquareColour)

    } 
    this.props.updateGameState(futureState);
    this.props.updatePlayersTurn("white");
  }


  buildASquare(row,col,colour,initialBoard) {
    var id = row.toString()+col.toString();
    let player, pieceName, pieceDisplay;
    if (row <=2) {player = "white"} 
    if (row >=7) {player = "black"} 
    if(row <= 1 || row >=8) {
      switch (col) {
        case 1:
        case 8:
          pieceDisplay = this.assignPieceDisplay(pieceName = "Rook", player)
          return initialBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-" + pieceName, display: pieceDisplay,},)
        case 2:
        case 7:
          pieceDisplay = this.assignPieceDisplay(pieceName = "Knight", player)
          return initialBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-" + pieceName, display: pieceDisplay,},)
        case 3:
        case 6:
          pieceDisplay = this.assignPieceDisplay(pieceName = "Bishop", player)
          return initialBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-" + pieceName, display: pieceDisplay,},)
        case 4:
          pieceDisplay = this.assignPieceDisplay(pieceName = "King", player)
          return initialBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-" + pieceName, display: pieceDisplay,},)
        case 5:
          pieceDisplay = this.assignPieceDisplay(pieceName = "Queen", player)
          return initialBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-" + pieceName, display: pieceDisplay,},)  
      }
    } else if (row === 2 || row === 7) {
        pieceDisplay = this.assignPieceDisplay(pieceName = "Pawn", player)
        return initialBoard.push({key: id, row: row, col: col, colour: colour, piece: player + "-" + pieceName, display: pieceDisplay,},)
    } else {
        return initialBoard.push({key: id, row: row, col: col, colour: colour, piece: "", display: ""},)
    }
  }

  assignPieceDisplay(pieceName,player) {
    switch (pieceName) {
      case "Rook":
        if (player === "white") { return "♖" } else { return "♜" }
      case "Knight":
        if (player === "white") { return "♘" } else { return "♞" }
      case "Bishop":
        if (player === "white") { return "♗" } else { return "♝" }
      case "King":
        if (player === "white") { return "♔" } else { return "♚" }
      case "Queen":
        if (player === "white") { return "♕" } else { return "♛" }
      case "Pawn":
        if (player === "white") { return "♙" } else { return "♟" }
    }

  }

  buildTheBoard(initialBoard) {
    for(let row = 8; row >= 1; row--) {
      for(let col = 1; col <= 8; col++) {
        if ((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0)) { var colour = 'square black'; }
        if ((row % 2 === 0 && col % 2 !== 0) || (row % 2 !== 0 && col % 2 === 0)) { var colour = 'square white'; }
        this.buildASquare(row,col,colour,initialBoard);
      };
    };
  }



}


export default Board;
