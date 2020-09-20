import { getSpeeds, collisionTest } from './battleFunctions.js';
import { RadarWave, AllRects } from '../../data/shipData.js';
import { callDice, freezeCopy } from '../helpFunctions.js';

export function spaceAiActions(ship, opponent, battleObject) {

  // zones of cnv:nw ne c sw se
  const zones = [{},{},{},{},{}]
  const centerOfShip = {x: ship.leftTopCorner.x + (ship.w / 2), y: ship.leftTopCorner.y + (ship.h / 2)};
  const distanceToOpponent = distanceCheck(ship, opponent);
  let opponentHorizontal = null;
  let opponentVertical = null;
  let bestDirection = 'forward';

  const centerOfNextCheckPoint = {
    x: battleObject.chosenCp.x + 50,
    y: battleObject.chosenCp.y + 50
  }

  // distance checks to check points
  const forwardTestSpeeds = radarCheck(centerOfShip, ship.heading, 4, 5, 'front');
  const turnLeftTestSpeeds = radarCheck(centerOfShip, ship.heading, 4, 5, 'port');
  const turnRightTestSpeeds = radarCheck(centerOfShip, ship.heading, 4, 5, 'star');
  const distanceIfForward = distanceCheck(forwardTestSpeeds, centerOfNextCheckPoint);
  const distanceIfLeft = distanceCheck(turnLeftTestSpeeds, centerOfNextCheckPoint);
  const distanceIfRight = distanceCheck(turnRightTestSpeeds, centerOfNextCheckPoint);

  if (distanceIfForward > distanceIfLeft) {

    bestDirection = 'turn left';
  }
  if (distanceIfForward > distanceIfRight) {

    bestDirection = 'turn right';
  }
  // clear all commands, expect accelerate
  ship.fireFront = false; ship.firePort = false; ship.fireStar = false; ship.accelerate = true;
  ship.braking = false; ship.turnLeft = false; ship.turnRight = false;

  // wheel turning:
  switch (bestDirection) {

    case 'turn left': ship.turnLeft = true; break;
    case 'turn right': ship.turnRight = true; break;
  }
  // check about where the opponent is for checkWhereIsOpponent by coordinates
  // this also launches cannons
  radarWaves(ship, opponent);

  // locate opponent
  if (ship.x > opponent.x) { opponentHorizontal = 'w' } else { opponentHorizontal = 'e'}
  if (ship.y < opponent.y) { opponentVertical = 's' } else { opponentVertical = 'n'}

  // if reached checkPoint, need to choose a new one
  if (distanceCheck(ship, battleObject.chosenCp) < 50) {

    battleObject.chosenCp = chooseCheckPoint(ship, battleObject.checkPoints);
  }

  // add also that if opponent is maybe 100 or nearer, change check point for some added movement
}

/* ---------------- */
// Help Functions:
/* ---------------- */

// check where ship would be if it would go front, left or right
function radarCheck(centerOfShip, heading, turnRate, speed, toWhere) {
  let direction = null;

  switch (toWhere) {
    case 'front': direction = heading; break;
    case 'star' : direction = heading += turnRate; break;
    case 'port' : direction = heading -= turnRate; break;
    default: console.log('cant find toWhere at radarCheck!');
  }
  const newSpeeds = getSpeeds(direction, speed);

  return {x: centerOfShip.x + -newSpeeds.x, y: centerOfShip.y + newSpeeds.y};
}

// choose a new checkPoint to fly towards
export function chooseCheckPoint(ship, arr) {
  const diceThrown = callDice(arr.length -1);

  return arr[diceThrown];

}
// make radarwave send, param is to where (front, port, star)
function sendWave(guns, ship) {
  const wave = new RadarWave(ship.x + (ship.w/2), ship.y + (ship.h/2), ship.heading, ship.w, ship.h, ship.name);
  let battery = null;
  let collision = false;

  // star = right, port = left
  if (guns === 'front') { wave.heading = ship.heading; battery = ship.frontGuns[0] }
  if (guns === 'port') { wave.heading = ship.heading - 90; battery = ship.portGuns[0]}
  if (guns === 'star') { wave.heading = ship.heading + 90; battery = ship.starGuns[0]}

  // give corners for collision test purpose
  wave.setCorners(wave.heading);

  // shoot the radarwave with for loop
  for (let i = 0; i < battery.range; i++) {

    // move wave 1 px
    const speeds = getSpeeds(wave.heading, 1);

    wave.x += -speeds.x;
    wave.y += speeds.y;
    wave.setCorners(wave.heading);

    // check collision
    const checkCollision = collisionTest(wave, false);

    // if hits enemy ship:
    if (checkCollision !== false && checkCollision !== 'obstacle!') { collision = true; }
  }

  return collision;
}

// Distance check
function distanceCheck(fromWhere, toWhere){
  const a = fromWhere.x - toWhere.x // x1 - x2;
  const b = fromWhere.y - toWhere.y // y1 - y2;

  const c = Math.sqrt( a*a + b*b );
  return c;
}

export function radarWaves(ship, opponent){
  let hit = null;
  // midpoints of walls
  const walls = {left: {x: 0, y: 300}, right: {x: 1200, y: 300}, up: {x: 600, y: 0}, bottom: {x: 600, y: 600}};
  const distances = {
    leftWall: distanceCheck(ship, walls.left),
    rightWall: distanceCheck(ship, walls.right),
    upWall: distanceCheck(ship, walls.up),
    bottomWall: distanceCheck(ship, walls.bottom),
    opponent: distanceCheck(ship, opponent)
  };

  // send radar waves:
  const frontSweep = sendWave('front', ship);
  const portSweep = sendWave('port', ship);
  const starSweep = sendWave('star', ship);

  if (frontSweep) { ship.fireFront = true; }
  if (portSweep) { ship.firePort = true; }
  if (starSweep) { ship.fireStar = true; }
}
