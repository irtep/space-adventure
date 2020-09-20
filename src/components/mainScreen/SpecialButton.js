import React, { Component } from "react";
import { render } from "react-dom";
import './mainStyle.css';

class SpecialButton extends Component {
  constructor(props) {
    super(props);
    this.clickControl = this.clickControl.bind(this);
  }
  clickControl(e) {
    // send clicked buttons name to parent
      this.props.dataReceiver(e.target.value);
  }
  render() {
    return (
      <div>
        <input type= "button" className= "compuButtons" value= {this.props.name} onClick= {this.clickControl}/>
      </div>
    );
  }
}

export default SpecialButton;