import React, { Component } from "react";
//import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import StartMenu from './components/startScreen/StartMenu.js';
import MainScreen from './components/mainScreen/MainScreen.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameObject: null
    };
    this.getDataFromChild = this.getDataFromChild.bind(this);
  }
  getDataFromChild(val) {
    // received submit from StartMenu
    // val.name is "submitted" when comes from StartMenu
      this.setState({gameObject : val.pack});
  }
  render() {
    /* Start menu if game just starts */
    if (this.state.gameObject === null) {
      return (
          <div>
            <StartMenu dataReceiver= {this.getDataFromChild}/>
          </div>
        );
    } else {
    /* If we received the gameObject, then goes to main screen */
      return (
          <div>
            <MainScreen
            dataReceiver= {this.getDataFromChild}
            gameObject = {this.state.gameObject}/>
          </div>
      );
    }
  }
}

export default App;
