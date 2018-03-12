import React, { Component } from 'react';
import {validMove} from './MoveRules'

class CheckLogic extends Component {
}



const doesMakeMeInCheck = (current,target,gameState) => {

}


export const isOpponentInCheck = (current,gameState)=>{

  let playerMoving = (current.piece).substring(0,5);
  let opponentsKing;
  let opponentInCheck=false;
  
  for (var square = 0; square < gameState.length; square++) {
    if ((gameState[square].piece).substring(6) === "King" && (gameState[square].piece).substring(0,5) != playerMoving) {
      opponentsKing = gameState[square];
    }
  }
//  console.log(playerMoving);
  // go through the board state, for each piece see if the opponent coudl be taken, i.e. is in check.
  for (var square = 0; square < gameState.length; square++) { 
    if ((gameState[square].piece).substring(0,5) === playerMoving) {
      if (validMove(gameState[square],opponentsKing,gameState)) { // if one of the opponents pieces could take 
        opponentInCheck = true;
      }
    }
  }
  if (opponentInCheck) { return true; } else { return false; }

}