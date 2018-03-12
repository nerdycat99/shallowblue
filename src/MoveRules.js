import React, { Component } from 'react';

  let currentRow;
  let currentCol;
  let targetRow;
  let targetCol;

class MoveRules extends Component {
}


const notTakingMyOwnPiece = (current,target)=>{ 
    if (current.piece.substring(0,5) != target.piece.substring(0,5)) { 
        return true 
    } 
}


const squareContainsPiece=(squareInState,squareToCheck,currentRow,currentCol,directionMoved) => {
  if (directionMoved === "HORZ") { // CHECK THE ROW
    if (squareInState.row === currentRow &&
        squareInState.col === squareToCheck &&
        squareInState.piece !== "") {
          return true;
    } 
  }
  if (directionMoved === "VERT") { // CHECK THE COL
    if (squareInState.col === currentCol &&
        squareInState.row === squareToCheck &&
        squareInState.piece !== "") {
          return true;
    } 
  }
  if (directionMoved === "DIAG") { // CHECK BOTH
    let thisCol = Number(squareToCheck.substring(0,1));
    let thisRow = Number(squareToCheck.slice(-1));
    if (squareInState.col === thisCol &&
        squareInState.row === thisRow &&
        squareInState.piece !== "") {
          return true;
    } 
  }
}

 
const notObstructed=(currentCol,targetCol,currentRow,targetRow,gameState) => {
  let squareToCheck;
  let directionMoved;
  let returnVal;
  if (currentRow === targetRow) { directionMoved = "HORZ"; } 
  else if (currentCol === targetCol) { directionMoved = "VERT"; } 
  else if (Math.abs(targetCol-currentCol) === Math.abs(targetRow-currentRow)){ directionMoved = "DIAG"; }
  else { directionMoved ="NS";}
  
  if (directionMoved === "VERT") {
    if (currentRow < targetRow) { // moving up
      for(squareToCheck = currentRow+1; squareToCheck < targetRow; squareToCheck++) {
        for (var square = 0; square < gameState.length; square++) {
          returnVal = squareContainsPiece(gameState[square], squareToCheck,currentRow,currentCol,directionMoved);
          if (returnVal) { return false; }
        }
      }
    } else { //moving down
      for(squareToCheck = currentRow-1; squareToCheck > targetRow; squareToCheck--) {
        for (var square = 0; square < gameState.length; square++) {
          returnVal = squareContainsPiece(gameState[square], squareToCheck,currentRow,currentCol,directionMoved);
          if (returnVal) { return false; }
        }
      }
    }
  }

  if (directionMoved === "HORZ") {
    if (currentCol < targetCol) { // moving right
      for(squareToCheck = currentCol+1; squareToCheck < targetCol; squareToCheck++) {
        
        for (var square = 0; square < gameState.length; square++) {
          returnVal = squareContainsPiece(gameState[square], squareToCheck,currentRow,currentCol,directionMoved);
          if (returnVal) { return false; }
        }
      }
    } else { // moving left
        for(squareToCheck = currentCol-1; squareToCheck > targetCol; squareToCheck--) {
          for (var square = 0; square < gameState.length; square++) {
            returnVal = squareContainsPiece(gameState[square], squareToCheck,currentRow,currentCol,directionMoved);
            if (returnVal) { return false; }
        }
      }
    }
  }

  if(directionMoved === "DIAG") {
    let colIteration, rowIteration, thisCol, thisRow;
    currentCol < targetCol ? colIteration = 1 : colIteration = -1;
    currentRow < targetRow ? rowIteration = 1 : rowIteration = -1;
    thisCol = currentCol + colIteration;
    thisRow = currentRow + rowIteration;
    
    while (thisCol !== targetCol) {
      squareToCheck = thisCol.toString() + thisRow.toString();
      for (var square = 0; square < gameState.length; square++) {
        returnVal = squareContainsPiece(gameState[square], squareToCheck,currentRow,currentCol,directionMoved);
        if (returnVal) { return false; }
      }
      thisCol += colIteration;
      thisRow += rowIteration;
    }
  }

  if(directionMoved === "NS") { return false; }

  return true;
}

const notZeroMove = (current,target) =>{
  if (current.key != target.key) {
    return true;
  }
}

const pawnWouldTakeVertically = (targetSquare,gameState) => {
  let retVal;
  for (var square = 0; square < gameState.length; square++) {
    if (gameState[square].key === targetSquare && gameState[square].piece != "") {
      retVal = true; // piece on square pawn cannot make this move
    } 
  }
  // how to make the ternary operator work with return true??
  if (retVal) { return true; } else { return false; }
}



const rulesForPiece = (piece,gameState) =>{

  let pieceType = piece.substring(6);
  let pieceColour = piece.substring(0,5);
  let targetSquare = targetRow.toString()+targetCol.toString();
  let retVal;
  
  switch (pieceType) {
    case "Pawn":
      // if the target is diag by 1 and has opponent piece in allow move
      // calculate if current row and column to target row and column is diag one
      // if so test if target has opponent piece in

      if (Math.abs(targetCol-currentCol) === Math.abs(targetRow-currentRow)){ 
        if ((pieceColour === "white" && currentRow +1 === targetRow) ||
           (pieceColour === "black" && currentRow -1 === targetRow)) {
             return true;
           }
      }
  
      if ((pieceColour === "white" && currentRow === 2 && currentCol === targetCol && currentRow +2 === targetRow) || 
         (pieceColour === "white" && currentCol === targetCol && currentRow +1 === targetRow)) {
          if (!pawnWouldTakeVertically(targetSquare,gameState)) { return true; } else { return false; }   
      } else if ((pieceColour === "black" && currentRow === 7 && currentCol === targetCol && currentRow -2 === targetRow) ||
                (pieceColour === "black" && currentCol === targetCol && currentRow -1 === targetRow)) {
          if (!pawnWouldTakeVertically(targetSquare,gameState)) { return true; } else { return false; }   
      } else {
        return false;
      }
    
    case "Rook":
      if (currentRow === targetRow || currentCol === targetCol) { return true; } 
      else { return false; }

    case "Knight":
      let rowMovement = Math.abs(targetRow-currentRow);
      let colMovement = Math.abs(targetCol-currentCol);
      if (rowMovement === 1 && colMovement === 2 || rowMovement === 2 && colMovement === 1) {
        return true;
      } else { return false; }

    case "Bishop":
      if (Math.abs(targetCol-currentCol) === Math.abs(targetRow-currentRow)) { return true; } 
      else {return false; }

    case "King":
      if (currentRow === targetRow || currentCol === targetCol 
        || Math.abs(targetCol-currentCol) === Math.abs(targetRow-currentRow)) {
          if (currentRow +1 === targetRow || currentRow -1 === targetRow
            || currentCol +1 === targetCol || currentCol -1 === targetCol) {
              return true; 
          } else { return false; }
      } else { return false; }

    case "Queen":
    if (currentRow === targetRow || currentCol === targetCol || Math.abs(targetCol-currentCol) === Math.abs(targetRow-currentRow)) { 
      return true; 
    } else {
      return false;
    }
  }
}





export const validMove = (current,target,gameState,skipCheckCheck)=>{
    currentRow = current.row;
    currentCol = current.col;
    targetRow = target.row;
    targetCol = target.col;
  if (current.piece.substring(6) === "Knight" && notZeroMove(current,target) && notTakingMyOwnPiece(current,target) && rulesForPiece(current.piece)) {
     return true;
  } else {
    if (notTakingMyOwnPiece(current,target) && 
        notZeroMove(current,target) &&
        notObstructed(currentCol,targetCol,currentRow,targetRow,gameState) &&
        rulesForPiece(current.piece,gameState)) {
          return true;
          /*
          if (doesMakeMeInCheck(current,target,gameState)) {
            return false;
          } else {
            return true;
          }  
          */
    } else {
      return false;
    }
  }    
}



export const notTakingOpponentsKing = (target) => {
  if ((target.piece).substring(6) != "King") {
    return true;
  } else {
    return false;
  }
    
}


export const doesNotPlacePlayerInCheck = (current,target,gameState) => {

  let playerMoving = (current.piece).substring(0,5);
  let playerMovingsKing;
  let playerPutsThemselvesInCheck=false;
  
  for (var square = 0; square < gameState.length; square++) {
    if ((gameState[square].piece).substring(6) === "King" && (gameState[square].piece).substring(0,5) === playerMoving) {
      playerMovingsKing = gameState[square];
    }
  }

  // go through the board state, for each piece of the opponents pieces 
  // to see if any could take the users king as a result of users' move
  for (var square = 0; square < gameState.length; square++) {
    if ((gameState[square].piece).substring(0,5) != playerMoving && (gameState[square].piece).substring(0,5) != "") {
      if (validMove(gameState[square],playerMovingsKing,gameState)) {
        playerPutsThemselvesInCheck = true;
      }
    }
  }
  if (playerPutsThemselvesInCheck) { return false; } else { return true; }
}
  
/*
All
x check it's your go done in method that calls this
x check don't take your own piece
x check no pieces between current and target
x determine if diagonal move 
x determine if horizontal move
x determine if vertical move


how to take another piece (capture)
x does it make check
does it make stalemate
does it make checkmate
pawn promotion

*/




