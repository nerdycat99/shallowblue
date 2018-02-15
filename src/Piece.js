import React, { Component } from 'react';

class Piece extends Component {
  constructor(props) {
    super(props);
    this.createPiece = this.createPiece.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
  //  this.props.initPiece.row = 4;
  //  alert(this.props.initPiece.piece);
  } 

  createPiece() {
    let pieceName = this.props.initPiece.piece;
    let pieceRow = this.props.initPiece.row;
    let pieceColour = this.props.initPiece.player;
  //  if (pieceName != "") {
      switch (pieceRow) {
        case 1:
        case 2:
        return pieceName;
          break;
        case 3:
        case 4:
        case 5:
        case 6:
          return pieceName;
          break;
        case 7:
        case 8:
        return pieceName;
          break;
      }
  //  }
  }


    render() {

        return(
          <div onClick={this.handleClick}>{this.createPiece()}</div>
        );

    }

  
}

export default Piece;