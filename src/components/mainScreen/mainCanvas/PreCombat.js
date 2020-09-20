import React, { Component } from "react";
import { render } from "react-dom";
import { giveRatings } from '../../../functions/helpFunctions.js';
import "./mainCanvasStyle.css";

class PreCombat extends Component {
  constructor() {
    super();
    this.state = {
      gameObject: '',
      infoText: ''
    }
    this.sendToParent = this.sendToParent.bind(this);
  }
  sendToParent(info) {
    this.props.dataReceiver(info.target.value);
  }

  componentDidUpdate() {
    if (this.props !== '' && this.state.gameObject === '') {
      if (this.props.gameData.gameObject !== '') {
        this.setState({
          gameObject: this.props.gameData.gameObject
        });
      }
    }
    if (document.getElementById('preCombatDiv').classList.contains('invis') === false && this.state.infoText === '') {
      this.setState({
        infoText : this.props.gameData.gameObject.player.ship.name + ' vs. ' + this.props.gameData.travelTarget
      });
    }
  }
  render() {
    return (
      <div id="preCombatDiv">
        Encounter in Space.<br/><br/>
        {this.state.infoText} <br/> <br/>
        <input type= 'button' value= 'Start battle!' onClick={this.sendToParent}/><br/><br/>
        Ok, this is a combat for life and dead. No prisoners will be taken.<br/>
        arrow keys will move the ship. <br/>
        "w" key fires forward cannons of the ship.<br/>
        "a" key fires left broadside cannons <br/>
        "d" key fires right broadside cannons <br/><br/>
        if you lose the battle the game is over.
      </div>
    );
  }
}

export default PreCombat;