import React, { Component } from "react";
import { render } from "react-dom";
import { professions, races } from '../../data/characters.js'; 
import './startStyle.css';

class CenterSection extends Component {
  constructor() {
    super();
    this.state = {
      playersName: '',
      shipsName: '',
      profession: '',
      race: '',
      psw: ''
    }
    this.collectData = this.collectData.bind(this);
    this.clickControl = this.clickControl.bind(this);
    this.focusedDropdown = this.focusedDropdown.bind(this);
  }
  componentDidMount(){
    document.getElementById('welcome').classList.remove('invis');
     
    /* fill menus */    
    professions.forEach( (item) => { 
      const o = document.createElement("option");
        o.text = item.name;
        o.value = item.name;
        o.key = item.name;
        document.getElementById("selectPro").appendChild(o);
      });  
      /*
    races.forEach( (item) => { 
      const o = document.createElement("option");
        o.text = item.name;
        o.value = item.name;
        o.key = item.name;
        document.getElementById("selectRace").appendChild(o);
      });
      */
  }
  componentDidUpdate() {
    const welc = document.getElementById('welcome');
    const plaFor = document.getElementById('playerForm');
    const chaName = document.getElementById('charName')
    const shipName = document.getElementById('shipName')
    const sePro = document.getElementById('selectPro');
    const seRace = document.getElementById('selectRace');
    const psw1 = document.getElementById('psw1');
    const psw2 = document.getElementById('psw2');
    const subDetails = document.getElementById('submitDetails');

    // remove option "choose a profession" if professions is chosen
    if (sePro.options[0].value === 'Choose a profession' && sePro.value !== 'Choose a profession') {
      sePro.remove(0);
    }
    // remove option "choose a race", if race is chosen
    /*
    if (seRace.options[0].value === 'Choose a race' && seRace.value !== 'Choose a race') {
      seRace.remove(0);
    }
    */
    /* if phase 1, show player form and hide welcome text. */
    if (this.props.phase === 1) {
      plaFor.classList.remove('invis');
      welc.classList.add('invis');
    }
    /* if all is filled, make the submit button visible */
    if (
      this.state.playersName !== '' && this.state.shipsName !== '' && this.state.profession !== ''  /*&&
     this.state.race !== '' && this.state.psw !== ''*/ 
    ) {
      subDetails.classList.remove('invis');
    }
  }
  collectData(elem) {
    /* collects data from input field and takes special chars away*/
    const collectedData = elem.target.value.replace(/[\u00A0-\u9999<>\&]/gim, ''); 
    
    switch (elem.target.id) {
      case 'charName':
        this.setState({playersName: collectedData});
      break;
      case 'shipName':
        this.setState({shipsName: collectedData});
      break;
      case 'selectPro':
        this.setState({profession: elem.target.value});
      break;
      case 'selectRace':
        this.setState({race: elem.target.value});
      break;
      case 'psw1':
        this.setState({psw: elem.target.value});
        // add something to check that psw1 and psw2 are same.
      break;
    }
  }  
  clickControl(element) {
    const objectToSend = {name: element.target.id, value: null};

    switch (element.target.id) {
      case 'submitDetails':
        objectToSend.value = this.state;
      break;  
    }
    // send info about what button was clicked to parent
    this.props.sendData(objectToSend); 
  }
  focusedDropdown(element) {
    const objectToSend = {name: 'infoToLeftSection', value: element.target.id}
    this.props.sendData(objectToSend);
  }

  render() {
    return (
      <div>

        <div id= "welcome" className= "invis">
          {/* Start of app */}
          <span className= "fa fa-star stars small" style={{ fontSize: 6 }} />
          <p className= "fadingIn intro">
            Welcome to the game, captain. <br />
            <br /> To start a new adventure, click "new game" from left. <br />
            <br /> This game requires desktop/laptop to play. Mobile version doesn't exist.
          </p>
        </div>

        <div id= "playerForm" className= "invis">
          {/* Player details form */}
          Choose your name:<br/>
          <input type= "text" id= "charName" className= "txtInputs" onChange= {this.collectData}/><br/>
          Choose name of your ship:<br/>
          <input type= "text" id= "shipName" className= "txtInputs" onChange= {this.collectData} /><br/>
          <select id= "selectPro" className= "rollMenus" onChange= {this.collectData} onFocus= {this.focusedDropdown}>
          <option value = "Choose a profession">Choose a profession</option>
          </select><br />
          {/*
          <select id= "selectRace" className= "rollMenus" onChange= {this.collectData} onFocus= {this.focusedDropdown}>
          <option value = "Choose a race">Choose a race</option>
          </select><br />
          */}
          {/* 
          Choose a password:<br/>
          <input type= "password" id= "psw1" className= "txtInputs" onChange= {this.collectData} /><br/>
          Repeat the password:<br/>
          <input type= "password" id= "psw2" className= "txtInputs" /><br/>
          */}
           {/* Buttons */} 
          <input type= "button" id= "submitDetails" value= "submit" className= "but invis" onClick= {this.clickControl} />
          {/* 
          <input type= "button" id= "back" value= "back" className= "but" onClick= {this.clickControl} />
          */}
        </div>
        {/* here comes info text like, passwords need to match, or fill all the fields etc. */}
        <div id= "infoPlace"></div>

      </div>
    );
  }
}

export default CenterSection;