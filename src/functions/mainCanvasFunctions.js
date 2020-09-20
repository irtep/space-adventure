import { arcVsArc, distanceCheck, giveRatings, rectVsRectInMap, checkRoute } from './helpFunctions';
import { motors, shipGuns, hulls, shipModules } from '../data/shipData.js';
import { systems } from '../data/systemsAndPlanets.js';

// move ship function for players ship:
export function movePlayerShip(gameObject, isShip, isPlanet, target, motorPower) {
  // check where is destination
  const systemIn = systems.filter( sys => sys.name === gameObject.player.systemLocation);
  const systemFound = systemIn[0];
  let voyageTarget = null;
  let voyageCoords = null;
  if (isShip) { voyageTarget = gameObject.aiShips.filter( ship => ship.name === target) }
  if (isPlanet) { voyageTarget = systemFound.locations.filter( syst => syst.name === target) }
  if (isShip) { voyageCoords = voyageTarget[0].aiDetails.located; }
  if (isPlanet) { voyageCoords = voyageTarget[0].coords }
  // check if ship wants to change destination (later maybe, not sure if this will be done here of in mainCanvas)
  // check next step for destination
  // pretty blunt system to go depending by speed.. but after work a bit tired to think more sofisticated.. maybe later :)
  const next = checkRoute(gameObject.player.mapCoords, voyageCoords);
  const next2 = checkRoute(next, voyageCoords);
  const next3 = checkRoute(next2, voyageCoords);
  const next4 = checkRoute(next3, voyageCoords);
  const next5 = checkRoute(next4, voyageCoords);
  const places = [
    next, next2, next3, next4, next5
  ];
  // need to add somekind of check too that it wouldnt pass.. or atleast check if it even can pass...
  // return it
  return {now: gameObject.player.mapCoords, next: places[motorPower - 1], target: voyageCoords}
}

function clearCanvas(canvas, ctx){
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all
}
      /*
      motors
      // (name, size, power, durability, value, refresh, desc)
      // shipGuns
      name, reloadTime, energyUsage, power, shieldPiercing, color, speed, range, value, desc
      // hulls:
      name, width, height, armours, maxModules, gunMounts, cargoSpace, value, desdc
      // shipModules:
      (name, size, energyUsage, power, moduleType, value, desc)
       */
export function makeSpaceMap(gameObject, canvas, systems, whatToDraw, hoverDetails, scannedShip) {
  //console.log('scanned shipo: ', scannedShip);
  const mainInfoText1 = 'Enjoy the game! If you do not know what to do, click Help Me! below.'
  const mainInfoText2 = '';
  const ctx = canvas.getContext("2d");
  const whatSystem = systems.filter( sys => sys.name === gameObject.player.systemLocation);
  const scannedShipDetails = gameObject.aiShips.filter( ship => scannedShip === ship.name);
  // scanned ai-ship stats and players ships stats:
  // speed
  // firepower
  // defence
  const scanners = shipModules.filter( modu => modu.moduleType === 'scanner');
  // check what scanner player has and note its power
  let scannerPower = null;
  for (let i = 0; i < scanners.length; i++) {
    for (let ii = 0; ii < gameObject.player.ship.modules.length; ii++) {
      if (scanners[i].name === gameObject.player.ship.modules[ii]) {
        scannerPower = scanners[i].power;
      }
    }
  }
  // get scanner range:
  // distanceCheck at helpFunctions
  // data/shipData.js has shipModules .... go ship.modules
  // (name, size, energyUsage, power, moduleType, value, desc)

  //console.log('drawing: ', gameObject);
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all

  switch (whatToDraw) {
    case 'system':

      // write system info
      ctx.font = '15px Arial';
      ctx.fillStyle = 'gold';
      ctx.fillText(mainInfoText1, 10, 15);
      ctx.fillText(mainInfoText2, 10, 30);
      //ctx.fillText(whatSystem[0].name, 10, 15);
      /*
      ctx.font = '12px Arial';
      ctx.fillStyle = 'gold';
      ctx.fillText(whatSystem[0].desc, 10, 35);
      */

      // paint planets
      whatSystem[0].locations.forEach( (loca, index) => {
        // make collision check if this is being hovered atm.
        const collision = arcVsArc(loca.coords, hoverDetails, loca.size, 5);
        let fillColor = 'white';
        let fillDetails = '';

        if (collision) { fillColor = 'yellowGreen'; fillDetails = ' (click for details)'; }

        ctx.beginPath();
        ctx.fillStyle = loca.color;
        ctx.arc(loca.coords.x, loca.coords.y, loca.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.font='10px Arial';
        ctx.shadowColor='black';
        ctx.shadowBlur=7;
        ctx.lineWidth=2;
        ctx.strokeStyle = 'black';
        ctx.strokeText(loca.name, loca.coords.x + 10, loca.coords.y);
        ctx.shadowBlur=0;
        ctx.fillStyle=fillColor;
        ctx.fillText(loca.name + fillDetails, loca.coords.x + 10, loca.coords.y);
        ctx.closePath();
      });
      // draw ship
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.arc(gameObject.player.mapCoords.x, gameObject.player.mapCoords.y, 2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.font = '12px Audiowide';
      ctx.fillStyle = 'orange';
      ctx.fillText(gameObject.player.ship.name, gameObject.player.mapCoords.x + 10, gameObject.player.mapCoords.y - 10);

      // draw npc ships
      gameObject.aiShips.forEach( ship => {
        // check distance
        const distance = distanceCheck(ship.aiDetails.located, gameObject.player.mapCoords);
        // if distance same or smaller draw the ship
        if (distance <= scannerPower) {
          let shipColor = null;

          switch (ship.aiDetails.profession) {
            case 'Raider': shipColor = 'maroon'; break;
            case 'Police': shipColor = 'blue'; break;
            case 'Freelancer': shipColor = 'purple'; break;
            case 'Smuggler': shipColor = 'red'; break;
            case 'Merchant': shipColor = 'lightBlue'; break;
            default: shipColor = 'white';
          }
          ctx.beginPath();
          ctx.strokeStyle = shipColor;
          ctx.arc(ship.aiDetails.located.x, ship.aiDetails.located.y, 2, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.closePath();
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          ctx.shadowColor = 'white';
          ctx.font = '14px Times New Roman';
          ctx.fillStyle = shipColor;
          ctx.fillText(ship.name, ship.aiDetails.located.x + 10, ship.aiDetails.located.y -10);
        }
      });
      // draw scanner screen:
      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.rect(0, canvas.height - 130, 125, 129);
      ctx.stroke();
      ctx.closePath();
      ctx.font = '12px Audiowide';
      ctx.fillStyle = 'lightGreen';
      ctx.fillText('Scanner', 10, canvas.height -140 );
      if (scannedShip !== '' && scannedShip !== undefined) {
        const aiShipsDetails = giveRatings(scannedShipDetails[0]);
        const playerShipDetails = giveRatings(gameObject.player.ship);
        // scanneds ai ships stats
        ctx.font = '11px Audiowide';
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'black';
        ctx.fillText(scannedShipDetails[0].name, 10, canvas.height - 115);
        ctx.fillText(scannedShipDetails[0].aiDetails.profession + ' ship', 10, canvas.height - 99);
        ctx.fillText('speed: ' + aiShipsDetails.speed, 10, canvas.height - 86);
        ctx.fillText('firepower: ' + aiShipsDetails.firePower, 10, canvas.height - 74);
        ctx.fillText('defence: ' + aiShipsDetails.defence, 10, canvas.height - 62);
        // players ships stats:
        ctx.fillStyle = 'orange';
        ctx.fillText('your ships stats: ', 10, canvas.height - 48);
        ctx.fillText('speed:  ' + playerShipDetails.speed, 10, canvas.height - 35);
        ctx.fillText('firepower:  ' + playerShipDetails.firePower, 10, canvas.height - 24);
        ctx.fillText('defence: ' + playerShipDetails.defence, 10, canvas.height - 12);
        // draw button of interception course
        const btnDetails = {x: 129, y: canvas.height - 25, w: 300, h: 25};
        const mouseRect = {x: hoverDetails.x, y: hoverDetails.y, w: 10, h: 10};
        const rvr = rectVsRectInMap(mouseRect, btnDetails);
        // if hovering the button
        if (rvr) {
          ctx.beginPath();
          ctx.fillStyle = 'white';
          ctx.shadowColor = 'gray';
          ctx.rect(129, canvas.height - 25, 300, 25);
          ctx.fill();
          ctx.closePath();
          ctx.fillStyle = 'black';
          ctx.fillText('Set course to intercept ' + scannedShipDetails[0].name, 130, canvas.height - 9);
          // if not hovering the button
        } else {
          ctx.beginPath();
          ctx.strokeStyle = 'magenta';
          ctx.rect(129, canvas.height - 25, 300, 25);
          ctx.stroke();
          ctx.closePath();
          ctx.fillStyle = 'red';
          ctx.fillText('Set course to intercept ' + scannedShipDetails[0].name, 130, canvas.height - 9);
        }
      }
    break;
  }
}

// travel interval
export function travelInSpace(state, target, isBase, isShip) {
  // kill old intervals
  // get targets coords
  // make the movement.


}
