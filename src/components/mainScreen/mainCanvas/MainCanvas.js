import React, { Component } from "react";
import { render } from "react-dom";
import './mainCanvasStyle.css';
import { systems } from '../../../data/systemsAndPlanets.js';
import { makeSpaceMap, movePlayerShip } from '../../../functions/mainCanvasFunctions.js';
import { arcVsArc, distanceCheck, checkRoute, rectVsRectInMap, shipGenerator, freezeCopy } from '../../../functions/helpFunctions.js';
import { draw } from '../../../functions/combatFunctions/draw.js';
import { spaceAiActions, chooseCheckPoint } from '../../../functions/combatFunctions/aiFunctions.js';
import { animate, shipActions, bulletActions  } from '../../../functions/combatFunctions/engine.js';
import { getSpeeds, checkKeyPressed, checkKeyReleased, getGunLocation, firingSolutions,
        checkGunStatuses, collisionTest, dealDamage } from '../../../functions/combatFunctions/battleFunctions.js';
import { moveShip } from '../../../functions/aiShipFunctions.js';
import { motors, hulls, shipGuns, shipModules, Starship, AllRects, RectObstacle } from '../../../data/shipData.js';
//import { Starship, AllRects, RectObstacle } from '../../../data/classes.js';
import DetailsBox from './DetailsBox.js';
import PreCombat from './PreCombat.js';
import PostCombat from './PostCombat.js';
export let tempGameObject = null;

class MainCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPlanet: null,
      gameObject: this.props.gameObject,
      showDetailsOf: 'space',
      travelTarget: '',  // this is needed to compare to clickedPlanet to determine if target has changed
      requestFromBottom: '',
      scannedShip: '',
      travelStatus: 'standBy',
      animation: false
    }
    this.hovering = this.hovering.bind(this);
    this.clickControl = this.clickControl.bind(this);
    this.getDataFromChild = this.getDataFromChild.bind(this);
    this.sendToBottom = this.sendToBottom.bind(this);
    this.financialAction = this.financialAction.bind(this);
    this.animateShipMovements = this.animateShipMovements.bind(this);
  }
  animateShipMovements(){
    const gameObj = this.state.gameObject;
    const gameO = this.state;

    if (gameObj.pause) { // gotta check this... as i dont have pause there atm.
      // not needed for anything i think, as this will pause while showDetailsOf is not space etc.
    } else {
      // ai ships move
      gameObj.aiShips.forEach( (ship, idx) => {
      // get power of motor
      let motorPower = null;
      for (let i = 0; i < motors.length; i++) {
        if (motors[i].name === gameObj.aiShips[idx].motor) {
          motorPower = motors[i].power / 10;
        }
      }
      if (ship.disabled === false) {
        const moving = moveShip(ship, gameObj.player, motorPower);
        const distanceToPoint = distanceCheck(moving.now, moving.target);
        if (distanceToPoint < 3) {
          // at destination,
          // pick a new target
          // nextPoint
          ship.nextPoint++;
          if (ship.nextPoint >= ship.aiDetails.patrolRoute.length) {
            ship.nextPoint = 0;
          }
        } else {
          // move npc ship  and update to state to get refresh
          const gameObject = {...gameObj};
          gameObject.aiShips[idx].aiDetails.located = moving.next;
          }
        }
      });
      // players ship move
      // get power of motor
      let motorPower = null;
      for (let i = 0; i < motors.length; i++) {
        if (motors[i].name === this.state.gameObject.player.ship.motor) {
          motorPower = motors[i].power / 10;
        }
      }
      // if moving
      if (this.state.travelStatus === 'voyaging') {
        // get info about where are we and where to go
        const systemLocation = this.state.gameObject.player.systemLocation;
        const getSystem = systems.filter(syst => systemLocation === syst.name);
        const chosenPlanet = getSystem[0].locations.filter(planet => this.state.travelTarget === planet.name);
        const chosenShip = this.state.gameObject.aiShips.filter(ship => this.state.travelTarget === ship.name);
        let travelingTo = null;
        let isShip = false;
        let isPlanet = false;
        // choose now if it is chosenPlanet or chosenShip
        if (chosenPlanet.length === 1) {
          travelingTo = chosenPlanet[0].coords;
          isPlanet = true;
        } else {
          travelingTo = chosenShip[0].aiDetails.located;
          isShip = true;
        }
        const moving = movePlayerShip(this.state.gameObject, isShip, isPlanet, this.state.travelTarget, motorPower)
        //const moving = movePlayerShip(ship, travelTarget, motorPower);
        const distanceToPoint = distanceCheck(moving.now, moving.target);
        if (distanceToPoint < 4) {
          // at destination,
          if (isPlanet) {
            const gameObject = {...this.state.gameObject};
            gameObject.player.planetLocation = this.state.travelTarget;
            this.setState({
              travelStatus: 'docked',
              gameObject
            });
          } else {
            this.setState({
              travelStatus: 'rendezvouz',
              showDetailsOf: 'preCombat'
            });
          }
        } else {
          // move ship  and update to state to get refresh
          const gameObject = {...this.state.gameObject};
          gameObject.player.mapCoords = moving.next;  //
          // send info to parent and update setState
          this.setState({gameObject});
          }
        } // pasted until here
      // get mouse locations offsets to get where mouse is hovering.
      // might need to add here real hoverDetails later...
      const hoverDetails = {x: 0, y: 0};
      makeSpaceMap(gameObj, document.getElementById('space'), systems, 'system', hoverDetails, gameO.scannedShip);
      }
    if (gameO.showDetailsOf === 'space') {
      // start looping this while condition applies
      const battleAnimation = window.requestAnimationFrame(this.animateShipMovements);
    } else {
      // dont do anything if showDetailsOf is something else
    }
  }
  componentDidUpdate() {
    //console.log('this.state at mainCanvas', this.state);
    const hoverDetails = {x: 0, y: 0};
    if (this.state.gameObject !== '') {
      makeSpaceMap(this.state.gameObject, document.getElementById('space'), systems, 'system', hoverDetails, this.state.scannedShip);
    }
    if (this.props.gameObject !== '' && this.state.gameObject === '') {
      this.setState({gameObject: this.props.gameObject});
    }
    // if bottomPanel is sending '', pass it to state
    if (this.props.fromBottom === '' && this.state.requestFromBottom !== '') {
      this.setState({requestFromBottom: ''});
    }
    // if bottomPanel is transmitting button name, pass it to state
    if (this.props.fromBottom !== this.state.requestFromBottom && this.props.gameObject !== ''
       && this.props.fromBottom !== '') {
      this.setState({
        clickedPlanet: this.props.fromBottom,
        showDetailsOf: this.props.fromBottom,
        requestFromBottom: this.props.fromBottom
      });
    }
    // when player checking details of something, lets hide the bottompart
    const botPan = document.getElementById('bottomPage');
    if (this.state.showDetailsOf !== 'space') {
      if (botPan.classList.contains('invis') === false) {
        botPan.classList.add('invis');
      }
    } else {
      if (botPan.classList.contains('invis')) {
        botPan.classList.remove('invis');
      }
    }
    //console.log('gO now: ', JSON.parse(JSON.stringify(this.state)));
    if (this.state.gameObject !== '' && this.state.animation === false) {
        this.animateShipMovements();
        this.setState({animation: true});
    }
  }
  financialAction(data){
    const gOcopy = {...this.state.gameObject};
    // buying
    if (data.action === 'buyAction'){
      if (gOcopy.player.money >= data.price) {
        gOcopy.player.money -= data.price;
        // check if player has a container of that already
        const dubliCheck = gOcopy.player.ship.cargoBay.filter( unit => unit.name === data.name);
        if (dubliCheck.length === 0) {
          gOcopy.player.ship.cargoBay.push(data);
        } else {
          dubliCheck[0].quantity++;
        }
        this.setState({
          gameObject: gOcopy
        });
      } else {
        console.log('not enough money!');
      }
      // selling
    } else {
      let indexOfUnit = null;
      const locationCheck = gOcopy.player.ship.cargoBay.forEach( (unit, indx) => {
        if (unit.name === data.name) {
          indexOfUnit = indx;
        }
      });
      if (gOcopy.player.ship.cargoBay[indexOfUnit].quantity > 1) {
        gOcopy.player.ship.cargoBay[indexOfUnit].quantity--;
      } else {
        gOcopy.player.ship.cargoBay.splice(indexOfUnit, 1);
      }
      gOcopy.player.money += data.price;
      this.setState({
        gameObject: gOcopy
      });
    }
  }
  sendToBottom(info) {
    this.props.toBottom(info);
  }
  getDataFromChild(val) {
    // getting data from details box
    switch (val) {
      // this is when continuing after the victorious battle
      case 'Continue':
        console.log('continue came');
        let tGameObject = {...this.state.gameObject};
        tGameObject.aiShips = tGameObject.aiShips.filter( (currentShip) => {
          return currentShip.name !== tGameObject.battleObject.ships[1].name;
        });
        // set all to standBy as after that they can be restarted.
        tGameObject.aiShips.forEach( ship => { ship.travelStatus = 'standBy'});
        /**
         *  give points to player and loot
         */
        this.sendToBottom('back');
        this.setState({
          gameObject: tGameObject,
          travelStatus: 'standBy',
          travelTarget: '',
          showDetailsOf: 'space',
          requestFromBottom: '',
          scannedShip: '',
          animation: false
          });
          console.log('continue.. state..', this.state);
      break;
      case 'travel here':
        const gameObject = {...this.state.gameObject};
        gameObject.player.planetLocation = 'space';
        this.setState({
          travelStatus: 'voyaging',
          travelTarget: this.state.clickedPlanet,
          showDetailsOf: 'space',
          animation: false,
          gameObject
        });
      break;
      case 'Start battle!':
        const canvas = document.getElementById('space');
        //const gameObject = this.state.gameObject;
        const tGo = this.state.gameObject;
        const chosenShip = this.state.gameObject.aiShips.filter(ship => this.state.travelTarget === ship.name);
        tempGameObject = this.state.gameObject;
        // set canvas size to w1200 / h600
        canvas.height = 600; canvas.width = 1200;

        function animate(){
          const keyDownListeners = window.addEventListener("keydown", checkKeyPressed, false);
          const keyUpListeners = window.addEventListener("keyup", checkKeyReleased, false);
          if (tGo.battleObject.pause) {
            // game on pause
            // if battle has ended, end the battle:
            if (tGo.battleObject.finished) {
              console.log('battle is finished, no more actions');
            }
            // draw pause menu, that has atleast option to continue game...
          } else {
            // ai decisions:  (ai ship, opponent of ai)
            spaceAiActions(tGo.battleObject.ships[1], tGo.battleObject.ships[0], tGo.battleObject);
            // actions of ships
            tGo.battleObject.ships.forEach( ship => {
              shipActions(ship);
            });
            // actions of bullets
            tGo.battleObject.bullets.forEach( bullet => {
              if (bullet.live) {
                bulletActions(bullet);
              }
            });
            // clean dead bullets
            if (tGo.battleObject.bullets.length > 20) {
              tGo.battleObject.bullets.shift();
            }
            // draw
            draw(tGo.battleObject);
          }
          // check if battle is over:
          tGo.battleObject.ships.forEach( ship => {
            if ( ship.hitPoints < 1) { ship.destroy(); }
            if (ship.disabled === true) {
              tGo.battleObject.pause = true;
              tGo.battleObject.finished = true;
            }
          });
          if (tGo.battleObject.finished !== true) {
            const battleAnimation = window.requestAnimationFrame(animate);
          } else {
            //console.log('finished === true');
          }
        }

        document.getElementById('preCombatDiv').classList.add('invis');
        //document.getElementById('combatDiv').classList.remove('invis');
        document.getElementById('space').classList.remove('invis');
        // get here from gameObject = player.ship and gameData.aiShips.filter that matches gameData.travelTarget
        const ship1 = shipGenerator(tGo.player.ship, 0, ['white', 'blue'], tGo.player.name);
        const ship2 = shipGenerator(chosenShip[0], 3, ['red', 'cyan'], chosenShip[0].captain);
        // make battle object.
        const battleObject = {
          ships: [],
          bullets: [],
          //guns: [], // temporal to check gun placings
          obstacles: [
            // borders: RectObstacles: x, y, w, h, color, angle, name
            new RectObstacle(0, -55, 1200, 60, 'black', 0, 'borderUp'),
            new RectObstacle(0, 600 -5, 1200, 30, 'black', 0, 'borderBottom'),
            new RectObstacle(-25, 0, 30, 600, 'black', 0, 'borderLeft'),
            new RectObstacle(1200-5, 0, 30, 600, 'black', 0, 'borderRight'),],
          pause: false
        };
        // add ships to battle objects
        // first need to be players ship as keyListener works for first ship
        battleObject.ships.push(ship1);
        battleObject.ships.push(ship2);
        battleObject.ships.forEach( ship => {
          // update of "corners" for rotation etc.
          ship.setCorners(ship.heading);
          // set timer for energy regen
          // need stopper for this... for example when other ship is destroyed
          const shieldInterval = window.setInterval( () => {
            if (ship.energy < ship.maxEnergy) {
              ship.energy += ship.power;
              if (ship.energy > ship.maxEnergy) {
                ship.energy = ship.maxEnergy;
              }
            }
            if (battleObject.finished) {
              console.log('clearing shield interval');
              window.clearInterval(shieldInterval);
              canvas.height = 400; canvas.width = 900;
              if (this.state.showDetailsOf !== 'postCombat') {
                this.setState({
                  showDetailsOf: 'postCombat',
                  travelTarget: null,
                  travelStatus: 'afterCombat'
                  });
              }
            }
          }, 3000);
        });
        // corners for obstacles (for example area walls)
        battleObject.obstacles.forEach( obs => {
          obs.setCorners(obs.angle);
        });
        // make checkPoints for ai navigation
        battleObject.checkPoints = [{x: 90, y: 90},{x: 840, y: 90},{x: 90, y: 430},{x: 840, y: 430},{x: 110, y: 250},{x: 840, y: 110},{x: 321, y: 111}];
          // choose the first checkPoint for ai ship.
        battleObject.chosenCp = chooseCheckPoint(battleObject.ships[1], battleObject.checkPoints);
        // draw with battle object
        //draw(battleObject);
        tGo.battleObject = battleObject;
        animate(tGo);
      break;
      case 'back':
        this.sendToBottom('back');
        this.setState({
          showDetailsOf: 'space',
          animation: false
        });
      break;
      default: console.log('not finding val at getDataFromChild at mainCanvas');
    };
  }
  hovering(e) {
    // get mouse locations offsets to get where mouse is hovering.
    let r = document.getElementById('space').getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;
    const hoverDetails = {x: x, y: y};

    if (this.state.gameObject !== '') {
      makeSpaceMap(this.state.gameObject, document.getElementById('space'), systems, 'system', hoverDetails, this.state.scannedShip);
    }
  }
  clickControl(e) {
    const whatSystem = systems.filter( sys => sys.name === this.state.gameObject.player.systemLocation);
    const canvas = document.getElementById('space');
    let r = document.getElementById('space').getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;
    const hoverDetails = {x: x, y: y};

    this.state.gameObject.aiShips.forEach( ship => {
      // make collision check if this is being hovered atm.
      const collision = arcVsArc(ship.aiDetails.located, hoverDetails, 10, 5);
      if (collision) {
        //console.log('scanned: ', ship.name);
        this.setState({
          scannedShip: ship.name
          });
      }
    });
    whatSystem[0].locations.forEach( (loca, index) => {
      // make collision check if this is being hovered atm. these are starbases
      const collision = arcVsArc(loca.coords, hoverDetails, loca.size, 5);
      if (collision) {
        this.setState({
          clickedPlanet: loca.name,
          showDetailsOf: loca.name
          });
      }
    });

    // check if clicking the intercept course button
    if (this.state.scannedShip !== '') {
      const btnDetails = {x: 129, y: canvas.height - 25, w: 300, h: 25};
      const mouseRect = {x: hoverDetails.x, y: hoverDetails.y, w: 10, h: 10};
      const rvr = rectVsRectInMap(mouseRect, btnDetails);
      if (rvr) {
        const tMpGameObject = {...this.state.gameObject};
        tMpGameObject.player.planetLocation = 'space';
        this.setState( {
          travelStatus: 'voyaging',
          travelTarget: this.state.scannedShip,
          gameObject: tMpGameObject
          }
        );
      }
    }
  }
  render() {
    return (
      <div id= "spaceAndInfo">
        <canvas id= "space" width= "900" height= "400"
        onMouseMove= {(e) => this.hovering(e)}
        onClick= {(e) => this.clickControl(e)}>
        </canvas>
        <DetailsBox
        clickedPlanet= {this.state.showDetailsOf}
        gameObject= {this.state.gameObject}
        dataReceiver = {this.getDataFromChild}
        playerBuys = {this.financialAction}
        showDetailsOf = {this.state.showDetailsOf}
        fromBottomPanel = {this.props.fromBottom}/>
        <PreCombat
        gameData= {this.state}
        dataReceiver = {this.getDataFromChild}/>
        <PostCombat
        gameData= {this.state}
        dataReceiver = {this.getDataFromChild}/>
      </div>
    );
  }
}
export default MainCanvas;

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.setTimeout( callback, 1000 / 60 );
        };
    }());
}
