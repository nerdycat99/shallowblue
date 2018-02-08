import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  constructor(props) {
    super(props);
  //  this.handleClick = this.handleClick.bind(this);
  }

    render() {

        return(
            <div className={this.props.squaresFromParent.colour}>
              <div>
              {this.props.squaresFromParent.col}{this.props.squaresFromParent.row}
              </div>
            </div>
        );

    }

  
}

export default Square;