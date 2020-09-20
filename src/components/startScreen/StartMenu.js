import React, { Component } from "react";
import { render } from "react-dom";
import CenterSection from './CenterSection.js';
import RightSection from './RightSection.js';
import LeftSection from './LeftSection.js';
import { gameObject } from '../../data/miscVariables.js';
import { getShip } from '../../functions/helpFunctions.js';
import './startStyle.css';

class StartMenu extends Component {
  constructor() {
    super();
    this.state = {
      phase: 0,
      gameObject: null,
      /* target- and infoToSections are to pass info to childs from other childs */
      targetSection: null,
      infoToSection: null
    }
    this.getDataFromChild = this.getDataFromChild.bind(this);
  }
  componentDidMount() {
    // takes gameObject template from data
    this.setState({gameObject: gameObject});
    console.log('state, start ', this.state);
  }
  /* handles data that comes from childs and updates this.state */
  getDataFromChild(val) {
    switch (val.name) {
      case 'newGame': this.setState({phase : 1}); break;
      case 'loadGame': console.log('game loader not created yet'); break;
      case 'back':
        this.setState(state => ({
          phase: state.phase - 1
        }));
      break;
      /* when other child wants to send info to other sections*/
      case 'infoToLeftSection':
        this.setState({targetSection: 'left', infoToSection: val.value});
      break;
      /* players filled details come here and are updated to state */
      case 'submitDetails':
        const gameObject = {...this.state.gameObject};
        gameObject.player.name = val.value.playersName;
        gameObject.player.profession = val.value.profession;
        gameObject.player.race = val.value.race;
        gameObject.player.psw = val.value.psw;
        gameObject.player.ship = getShip(val.value.playersName, val.value.shipsName, val.value.profession);
        console.log('gO: ', gameObject);
        this.setState({gameObject});
        // after this should move to next screen.
        const sendToIndex = {name: 'submitted', pack: gameObject};
        console.log('send to index: ', sendToIndex);
        this.props.dataReceiver(sendToIndex);
      break;
      default: console.log('cant find val! ', val);
    }
    //console.log('state ', this.state);
  }

  render() {
    return (
      <div id="container">
        <header id="upCenter">
          <h1>
            <span className="fa fa-star stars smallStars" style={{fontSize:7}} />
            <div className="fadingIn bigHeader">The Space Adventure Game</div>
          </h1>
        </header>

        <section id="leftSection">
          <LeftSection
          phase= {this.state.phase}
          sendData= {this.getDataFromChild}
          infoToSections = {{target: this.state.targetSection, value: this.state.infoToSection}}
          gameObject = {this.state.gameObject} />
        </section>

        <section id="centerSection">
          <CenterSection phase= {this.state.phase}
          sendData= {this.getDataFromChild}
          infoToSections = {{target: this.state.targetSection, value: this.state.infoToSection}}
          gameObject = {this.state.gameObject} />
        </section>

        <section id="rightSection">
          <RightSection
          phase= {this.state.phase}
          infoToSections = {{target: this.state.targetSection, value: this.state.infoToSection}}
          gameObject = {this.state.gameObject} />
        </section>

        <footer id="foot">
          <span className="fa fa-star stars small" style={{fontSize:8}} />
        </footer>

      </div>
    );
  }
}

export default StartMenu;
