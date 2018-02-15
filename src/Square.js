import React, { Component } from 'react';
import Piece from './Piece';
import './Square.css';

let clickCount = false;
let current;
let target;
let thisPlayer;
let lastPlayer;


class Square extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.isValidMove = this.isValidMove.bind(this);
    this.playersMove = this.playersMove.bind(this);
    this.checkMate = this.checkMate.bind(this);
    this.notTakingMyOwnPiece = this.notTakingMyOwnPiece.bind(this);
    this.validForPiece = this.validForPiece.bind(this);

  }

  handleClick() {
    if (!clickCount) {
      if(this.props.initSquare.piece != '...') {
        current = this.props.initSquare;
        thisPlayer = (this.props.initSquare.piece).substring(0,5);
        clickCount = true;
      } else {
        alert("please select a piece to move")
      }
    } else {
      target = this.props.initSquare;
      clickCount = false;
      this.isValidMove(current,target)
    }
  } 

  isValidMove(current,target) {
    let curentRow = current.row;
    let currentCol = current.col;
    let targetRow = target.row;
    let targetCol = target.col;
    let piece = current.piece.substring(6);

    if (this.playersMove() && this.validForPiece(piece) && this.notTakingMyOwnPiece()) {
      lastPlayer = thisPlayer;
      this.props.updateTheBoard(current, target);
    } 
  }

  playersMove() { if (thisPlayer !== lastPlayer) { return true } }
  checkMate() { return false }
  notTakingMyOwnPiece() { if (thisPlayer != target.piece.substring(0,5)) { return true } }


  validForPiece(piece) {
    switch (piece) {
      case "Pawn":
        return true;
      case "Rook":
        return true;
      case "Knight":
        return true;
      case "Bishop":
        return true;
      case "King":
        return true;
      case "Queen":
        return false;
    }
  }

    render() {
        return(
            <div className={this.props.initSquare.colour + " " + "pos"+this.props.initSquare.key} onClick={this.handleClick}>
              <div>
                <Piece initPiece={this.props.initSquare}/>
              </div>
            </div>
        );
    }


  
}

export default Square;