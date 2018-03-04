import React, { Component } from 'react';
import {validMove} from './MoveRules'

class OpponentLogic extends Component {
  
}


const scoreForMove = (startSq,endSq,gameState) =>{
  
  for (var square = 0; square < gameState.length; square++) {
    if (gameState[square].key == endSq.key) {
      if ((gameState[square].piece).substring(0,5) === "white") {
        console.log("HIT " + gameState[square].key + " : "+endSq.key);
        return 10
      } else {
        console.log(gameState[square].key + " : "+endSq.key);
        return Math.floor(Math.random() * 8)+0;
      }
    }
  }
  /*
  let endSquareToCheck = parseInt(endSq.key);
  for (var square = 0; square < gameState.length; square++) {
    let thisSquareToCheck = parseInt(gameState[square].key);
    alert(gameState[square].key);
    if ((gameState[square].piece).substring(0,5) === "white") {
      return 10;
    } else {
      return Math.floor(Math.random() * 8)+0;
    }
  }
  */
}



export const opponentMove = (gameState)=>{
    let current, target;
    let selectedStart, selectedEnd
    let selectedScore = 0;
    let allPossibleMoves = [];

    for (var startSquare = 0; startSquare < gameState.length; startSquare++) {
      if ((gameState[startSquare].piece).substring(0,5) === "black") {
        for (var endSquare = 0; endSquare < gameState.length; endSquare++) {
          if (validMove(gameState[startSquare],gameState[endSquare], gameState)) {
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
    /*
    let randMoveSet = Math.floor(Math.random() * allPossibleMoves.length)+0; // choose a move set
    let randStart = allPossibleMoves[randMoveSet][0];
    let randEnd = allPossibleMoves[randMoveSet][1];
    console.log(allPossibleMoves);
    console.log(randStart);
    console.log(randEnd);
    console.log(allPossibleMoves[randMoveSet][2])
    */
  //  console.log(selectedStart);
  //  console.log(selectedEnd);
    console.log(allPossibleMoves);
    return([selectedStart, selectedEnd]);
}
