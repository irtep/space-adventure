import React, { Component } from "react";
import { render } from "react-dom";
import SpecialButton from "./SpecialButton.js";

const helpButtonStyle = {
  color: "white",
  backgroundColor: "DodgerBlue"
};
const buttonTitles = [
  {id: "Cargo", desc: "check cargo and if you are in starbase, make trading"},
  {id: "Help Me!", desc: "shows help for new plaer"},/*
  {id: "Crew", desc: "check crew and if you are in starbase, hire/fire crew"},
  {id: "Missions", desc: "check information about ongoing missions"},*/
  {id: "Ship", desc: "info about ship and options to buy new parts if you are in starbase"}, /*
  {id: "Log", desc: "log about recent messages"}, */
];

class BottomPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastClick: ''
    };
    this.getDataFromChild = this.getDataFromChild.bind(this);
  }
  componentDidUpdate() {
    if (this.props.dataFromCenter === 'back' && this.state.lastClick !== '') {
      this.props.dataSend('');
      this.setState({lastClick: ''});
    }
  }
  getDataFromChild(val) {
    // send data to parent
    this.props.dataSend(val);
    this.setState({lastClick: val});
  }
  render() {
    return (
      <div id="buttonBox">
        {buttonTitles.map((btn, idx) => {
          return (
            <div className="inner">
              <SpecialButton 
                name = {btn.id} 
                key = {btn.id + btn.desc} 
                description = {btn.desc}
                dataFromCenter = {this.props.dataFromCenter} 
                dataReceiver= {this.getDataFromChild}/> {/* receiving from button to here */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default BottomPanel;
