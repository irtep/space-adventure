// start NPC ships
if (this.state.gameObject !== '') {
  const updateSpeed = 1000;
  // ships are standingby
  // engine .powers are 10 and 20 atm.
  if (this.state.gameObject.aiShips[0].travelStatus === 'standBy') {
    // change travel status
    this.state.gameObject.aiShips.forEach( ship => {
      if (ship.travelStatus === 'standBy') {
        ship.travelStatus = 'voyaging';
      }
    });
    // start movements

    function animateShipMovements(ships) {
      // ai ships first
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

      // then players ship
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
        // remember to add movePlayerShip to imports
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
              gameObject});
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
          makeSpaceMap(this.state.gameObject, document.getElementById('space'), systems, 'system', hoverDetails, this.state.scannedShip);
          // send info to parent and update setState
          this.setState({gameObject});
          }
        }
        //  here terminate movements if fight going on etc.
        //if (this.state.travelStatus === 'rendezvouz') {
      //    console.log('clearing travelPlayer');
      //    clearInterval(travelPlayer);
      //  }

      //  here terminate movements if fight going on etc.
        if (this.state.travelStatus === 'rendezvouz') {
          // dont do anymore
        } else {
          const travelAnimation = window.requestAnimationFrame(animateShipMovements);
        }
    }
    // launch movement animation
    animateShipMovements();


    const travelNPC = window.setInterval( () => {
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
      //  here terminate movements if fight going on etc.
        if (this.state.travelStatus === 'rendezvouz') {
          clearInterval(travelNPC);
        }
    }, updateSpeed);


  // start PLAYER ship here

  if (this.state.travelStatus === 'standBy') {
    // change travel status
    this.setState({travelStatus: 'docked'});
    // start movements

    const travelPlayer = window.setInterval( () => {
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
        // remember to add movePlayerShip to imports
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
              gameObject});
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
          makeSpaceMap(this.state.gameObject, document.getElementById('space'), systems, 'system', hoverDetails, this.state.scannedShip);
          // send info to parent and update setState
          this.setState({gameObject});
          }
        }
        //  here terminate movements if fight going on etc.
        if (this.state.travelStatus === 'rendezvouz') {
          console.log('clearing travelPlayer');
          clearInterval(travelPlayer);
        }
    }, updateSpeed);
  }
}
  console.log('should start animation here: ', this.state);
  this.state.gameObject.aiShips.forEach( ship => {
    // start ai-ships
    if (ship.travelStatus === 'standBy') {
      ship.travelStatus = 'voyaging';
      const moving = moveShip(ship, this.state.gameObject.player);
      // return as now, next, target... all in coords.
    }
  });
}  // copied from here
