const canvas = document.getElementById('space');
//const gameObject = this.state.gameObject;
const tGo = this.state.gameObject;
const chosenShip = this.state.gameObject.aiShips.filter(ship => this.state.travelTarget === ship.name);
tempGameObject = this.state.gameObject;
// set canvas size to w1200 / h600
//canvas.height = 600; canvas.width = 1200;

function animate(){
  //const keyDownListeners = window.addEventListener("keydown", checkKeyPressed, false);
  //const keyUpListeners = window.addEventListener("keyup", checkKeyReleased, false);
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
    console.log('finished === true');
  }
}

//document.getElementById('preCombatDiv').classList.add('invis');
//document.getElementById('combatDiv').classList.remove('invis');
//document.getElementById('space').classList.remove('invis');
// get here from gameObject = player.ship and gameData.aiShips.filter that matches gameData.travelTarget
//const ship1 = shipGenerator(tGo.player.ship, 0, ['white', 'blue'], tGo.player.name);
//const ship2 = shipGenerator(chosenShip[0], 3, ['red', 'cyan'], chosenShip[0].captain);
// make battle object.
const spaceObject = {
  aiShips: this.state.gameObject.aiShips,
  myShip: [],
  // gameObject.player.mapCoords.x, gameObject.player.mapCoords.y,
  //ship.aiDetails.located
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
