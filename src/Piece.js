import React, { Component } from 'react';

class Piece extends Component {
  constructor(props) {
    super(props);

  }

    render() {

        return(
          <div>
            <div className="test">{this.props.piecesFromParent}
            </div>
          </div>
        );

    }

  
}

export default Piece;