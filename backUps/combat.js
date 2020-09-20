function animateShipMovements(){
  if (this.state.gameObject.pause) { // gotta check this... as i dont have pause there atm.
    // game on pause
    // if battle has ended, end the battle:
    if (tGo.battleObject.finished) {
      console.log('battle is finished, no more actions');
    }
    // draw pause menu, that has atleast option to continue game...
  } else {
    // ai decisions:  (ai ship, opponent of ai)
  this.state.gameObject.aiShips.forEach( (ship, idx) => {
    // get power of motor
    let motorPower = null;
    for (let i = 0; i < motors.length; i++) {
      if (motors[i].name === this.state.gameObject.aiShips[idx].motor) {
        motorPower = motors[i].power / 10;
      }
    }
    if (ship.disabled === false) {
      const moving = moveShip(ship, this.state.gameObject.player, motorPower);
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
      const gameObject = {...this.state.gameObject};
      gameObject.aiShips[idx].aiDetails.located = moving.next;
      makeSpaceMap(this.state.gameObject, document.getElementById('space'), systems, 'system', hoverDetails, this.state.scannedShip);
      // send info to parent and update setState
      this.setState({gameObject});
      }
    }
  });
    // draw
    makeSpaceMap(this.state.gameObject, document.getElementById('space'), systems, 'system', hoverDetails, this.state.scannedShip);
  }
  /*
  // check if battle is over:
  tGo.battleObject.ships.forEach( ship => {
    if ( ship.hitPoints < 1) { ship.destroy(); }
    if (ship.disabled === true) {
      tGo.battleObject.pause = true;
      tGo.battleObject.finished = true;
    }
  });
  */
  if (this.state.showDetailsOf !== 'space') {
    const battleAnimation = window.requestAnimationFrame(animate);
  } else {
    console.log('not space');
  }
}
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
    console.log('finished === true');
  }
}
