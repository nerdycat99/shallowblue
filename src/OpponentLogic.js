import React, { Component } from 'react';
import {validMove} from './MoveRules'

class OpponentLogic extends Component {
  
}




export const opponentMove = (gameState)=>{
    let current, target;
    let allPossibleMoves = [];

    for (var startSquare = 0; startSquare < gameState.length; startSquare++) {
      if ((gameState[startSquare].piece).substring(0,5) === "black") {
        let possibleMovesForStart = [gameState[startSquare]];
        for (var endSquare = 0; endSquare < gameState.length; endSquare++) {
          if (validMove(gameState[startSquare],gameState[endSquare], gameState)) {
            possibleMovesForStart.push(gameState[endSquare]);
          } 
        }
        if (possibleMovesForStart.length > 1) {
          allPossibleMoves.push(possibleMovesForStart);
        }
        possibleMovesForStart = [];
      }
    
      if (gameState[startSquare].row === 7 && gameState[startSquare].col === 2) {
        current = gameState[startSquare];  
      } 
      if (gameState[startSquare].row === 5 && gameState[startSquare].col === 2) {
        target = gameState[startSquare];  
      } 
    }
    console.log(allPossibleMoves);
    return([current, target]);
}
