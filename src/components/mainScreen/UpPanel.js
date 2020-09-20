import React, { Component } from "react";
import { render } from "react-dom";
import "./mainStyle.css";

class UpPanel extends Component {
  constructor() {
    super();
  }
  render() {
    if (this.props.gameObject !== "") {
      return (
        <div id="upperBox">
          <div className="inner">
            {this.props.gameObject.player.profession} Captain{" "}
            <span className="yellowText">
              {" "}
              {this.props.gameObject.player.name}{" "}
            </span>
            of starship{" "}
            <span className="yellowText">
              {" "}
              {this.props.gameObject.player.ship.name}
            </span>
          </div>
          <div className="inner">
            Location:{" "}
            <span className="yellowText">
              {this.props.gameObject.player.systemLocation}
            </span>
          </div>
        </div>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

export default UpPanel;
