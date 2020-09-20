import React, { Component } from "react";
import { render } from "react-dom";
import { professions, races } from '../../data/characters.js'; 
//import { getPro } from '../../functions/helpFunctions.js';
/*  i leave this for now if i need this later on some where...
import { Markup } from 'interweave';  // to render some html when needed
*/
import './startStyle.css';

/* Maps info about races or professions etc. */
class InfoMapper extends Component {
  /* later should add img and artBy atleast */
  render() {
    return (
      <div>
        <span id= {this.props.title.name} className= "bigger">{this.props.title.name} </span><br />
        <span className= "smaller">{this.props.title.desc}</span>
      </div>
    );
  }
}

class LeftSection extends Component {
  constructor(props) {
    super(props);
    this.clickControl = this.clickControl.bind(this);
  }
  componentDidUpdate() {
    const profsElem = document.getElementById('professions');
    const racesElem = document.getElementById('races');
    const buttonElem = document.getElementById('buttons');

    if (this.props.infoToSections.target === 'left') {
      switch (this.props.infoToSections.value) {
        case 'selectPro':
          profsElem.classList.remove('invis');
          buttonElem.classList.add('invis');
          if (racesElem.classList.contains('invis') === false) { racesElem.classList.add('invis'); }
        break;
        case 'selectRace':
          racesElem.classList.remove('invis');
          buttonElem.classList.add('invis');
          if (profsElem.classList.contains('invis') === false) { profsElem.classList.add('invis'); }
        break;
        default: console.log('not found value: ', this.props.infoToSections.value);
      }
    }
  }
  clickControl(element) {
    const objectToSend = {name: element.target.id, value: null};
    /*send info about what button was clicked to parent*/
    this.props.sendData(objectToSend); 
  }

  render() {
    return ( 
      <div>
        <div id= "buttons">
          <input type= "button" id= "newGame" value= "New Game" className= "but" onClick={this.clickControl}/> <br/>
          {
          /*
          <input type= "button" id= "loadGame" value= "Load Game" className= "but" onClick={this.clickControl}/>
          */
          }
        </div>
        <div>
          <span className= "fa fa-star stars small" style={{fontSize:7}}></span>
        </div>
        <div id= "professions" className= "invis">
         { professions.map( prof => {
           return (
             <InfoMapper
               title = {prof}
               key = {prof.name} 
             />
           );
         })}
        </div>
        <div id= "races" className= "invis">
         { races.map( rac => {
           return (
             <InfoMapper
               title = {rac}
               key = {rac.name} 
             />
           );
         })}
        </div>
      </div>
      );
  }
}

export default LeftSection;