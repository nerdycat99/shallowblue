import React, { Component } from 'react';
import Piece from './Piece';
import {validMove} from './MoveRules'
import './Square.css';

let clickCount = false;
let current;
let target;
let thisPlayer;
let lastPlayer; 
let movingSquareColour;


class Square extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.playersMove = this.playersMove.bind(this);
  //  this.notTakingMyOwnPiece = this.notTakingMyOwnPiece.bind(this);
  //  this.validForPiece = this.validForPiece.bind(this);
  }

  handleClick() {
 
    if (!clickCount) {
      if(this.props.initSquare.piece != '') {
        current = this.props.initSquare;     
        thisPlayer = (this.props.initSquare.piece).substring(0,5);
        if (this.playersMove()) {
          // first touch, user touched a piece and it is their turn
          movingSquareColour = current.colour;
          this.props.highlightSquare(current,true,movingSquareColour);
          clickCount = true;
        } else {
          alert ("it's not your move");
        }     
      } else {
        alert("please select a piece to move")
      //  pieceValid(current); - example, place all move logic in external fiel with export methods
      }
    } else {
      // in here we know it is the second click - target square known
      // in here we must return true if valid move
      // TRUE> movePiece, highlight off, set LastPlayer, reset clickCount
      // FALSE> invalid move, highlight off, leave LastPlayer as is, reset clickCount
      target = this.props.initSquare;
      clickCount = false;
      if (validMove(current,target, this.props.gameState)) {
        lastPlayer = thisPlayer;
        this.props.movePiece(current, target);
      } else {
        alert("invalid move");
      }
      this.props.highlightSquare(current,false,movingSquareColour);
    }
  } 

  playersMove() { if (thisPlayer !== lastPlayer) { return true } }
  
    render() {
        return(
            <div className={this.props.initSquare.colour + " " + "pos"+this.props.initSquare.key} onClick={this.handleClick}>
                <Piece initPiece={this.props.initSquare}/>
            </div>
        );
    }
}

export default Square;