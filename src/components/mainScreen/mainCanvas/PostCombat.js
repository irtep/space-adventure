import React, { Component } from "react";
import { render } from "react-dom";
import "./mainCanvasStyle.css";

/* Maybe not needed... i think i try to use the same canvas as for the normal game... */
class PostCombat extends Component {
  constructor() {
    super();
    this.state = {
      gameObject: '',
      infoText: '',
      battleResult: ''
    };
    this.sendToParent = this.sendToParent.bind(this);
  }
  sendToParent(info) {
    if (this.state.battleResult === 'lost') {
      window.location.href = 'https://testiprojekti-eff93.web.app/';
    } else {
      // post combat after win not coded yet properly, so game ends here too!
      //window.location.href = 'https://space-adventure.stackblitz.io/';
      /*
      document.getElementById('postCombatDiv').classList.add('invis');
      document.getElementById('space').classList.remove('invis');
      */
      this.props.dataReceiver(info.target.value);
    }
  }

  componentDidUpdate() {
    if (this.props !== '' && this.state.gameObject === '') {
      if (this.props.gameData.gameObject !== '') {
        this.setState({
          gameObject: this.props.gameData.gameObject
        });
      }
    }
    if (document.getElementById('postCombatDiv').classList.contains('invis') === false && this.state.infoText === '') {
      console.log('ship1 ship 2', this.props.gameData.gameObject.battleObject.ships);
      if (this.props.gameData.gameObject.battleObject.ships[0].disabled) {
        /**
         *  at this point update players info to database for top scores purposes
         */
        //console.log('battle is lost');
        this.setState({
          infoText: 'You lost the battle. Game is Over.',
          battleResult: 'lost'
          });
      } else {
        //console.log('battle is won');
        this.setState({
          infoText: 'You won the battle. Well Done!',
          battleResult: 'won'
          });
        // move npc ship  and update to state to get refresh
        /*
        const gameObject = {...this.state.gameObject};
        gameObject.aiShips[idx].aiDetails.located = moving.next;
        makeSpaceMap(this.state.gameObject, document.getElementById('space'), systems, 'system', hoverDetails, this.state.scannedShip);
        // send info to parent and update setState
        this.setState({gameObject});
        */
      }
    }
  }
  render() {
    return (
      <div id="postCombatDiv">
        PostCombat <br/>
        {this.state.infoText} <br/>
        <input type= "button" value= "Continue" onClick={this.sendToParent}/>
      </div>
    );
  }
}

export default PostCombat;
