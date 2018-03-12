import React, { Component } from 'react';
import {validMove} from './MoveRules'
import {notTakingOpponentsKing} from './MoveRules'

class OpponentLogic extends Component {
  
}


const scoreForMove = (startSq,endSq,gameState) =>{
  for (var square = 0; square < gameState.length; square++) {
    if (gameState[square].key == endSq.key) {
      if ((gameState[square].piece).substring(0,5) === "white") {
        return 10
      } else {
        return Math.floor(Math.random() * 8)+0;
      }
    }
  }
}


export const determineOpponentMove = (gameState)=>{
    let current, target;
    let selectedStart, selectedEnd
    let selectedScore = 0;
    let allPossibleMoves = [];

    for (var startSquare = 0; startSquare < gameState.length; startSquare++) {
      if ((gameState[startSquare].piece).substring(0,5) === "black") {
        for (var endSquare = 0; endSquare < gameState.length; endSquare++) {
          if (validMove(gameState[startSquare],gameState[endSquare], gameState) && notTakingOpponentsKing(gameState[endSquare])) {
            let score = scoreForMove(gameState[startSquare],gameState[endSquare],gameState);
            let thispossibleMove = [gameState[startSquare],gameState[endSquare],score];
            allPossibleMoves.push(thispossibleMove);
            thispossibleMove = [];
          } 
        }
      }
    }
    for (var move = 0; move < allPossibleMoves.length; move++) {
      if (allPossibleMoves[move][2] > selectedScore ) {
        selectedScore = allPossibleMoves[move][2]
        selectedStart = allPossibleMoves[move][0];
        selectedEnd = allPossibleMoves[move][1];   
      }
    }
  //  console.log(allPossibleMoves);
    return([selectedStart, selectedEnd]);
}
