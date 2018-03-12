import React, { Component } from 'react';
import Piece from './Piece';
import {validMove} from './MoveRules'
import {notTakingOpponentsKing} from './MoveRules'
import {doesNotPlacePlayerInCheck} from './MoveRules'


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
  //  this.cloneTheState = this.cloneTheState.bind(this);
  //  this.validForPiece = this.validForPiece.bind(this);
  }

  handleClick() {
 
    if (!clickCount) { // first click - get piece to move
      if(this.props.initSquare.piece != '') {
        current = this.props.initSquare;     
        thisPlayer = (this.props.initSquare.piece).substring(0,5);
        if (this.playersMove()) {
          movingSquareColour = current.colour;
          this.props.highlightSquare(current,true,movingSquareColour);
          clickCount = true;
        } else {
          alert ("it's not your move");
        }     
      } else {
        alert("please select a piece to move")
      }
    } else { // second click - get square to move it to
      target = this.props.initSquare;
    //  let cloneOfState = this.cloneTheState(current,target,this.props.gameState);

    //  let isCheck = doesMoveMakeCheck(current,target,cloneOfState);
    //  console.log(cloneOfState);
      clickCount = false;
    //  if (validMove(current,target, this.props.gameState) && notTakingOpponentsKing(target) && doesNotPlacePlayerInCheck(current,target, this.props.gameState)) {
      if (validMove(current,target, this.props.gameState) && notTakingOpponentsKing(target)) {
        lastPlayer = thisPlayer;
        this.props.movePiece(current, target);
      } else { alert("invalid move"); }
    
      this.props.highlightSquare(current,false,movingSquareColour);
    }
  } 

  playersMove() { 
    if (thisPlayer == this.props.currentPlayer) { return true; }
  }  

    render() {
        return(
            <div className={this.props.initSquare.colour + " " + "pos"+this.props.initSquare.key} onClick={this.handleClick}>
                <Piece initPiece={this.props.initSquare}/>
            </div>
        );
    }
}

export default Square;