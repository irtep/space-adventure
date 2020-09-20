/*
  propably lots of experimental stuff first...
  // something continues to loop....
  // could go to after combat afterwards and then "continue" from there with button
  // wrong sized battlefield
*/
import { hulls, motors, shipGuns, shipModules } from '../../data/shipData.js';
import { Starship, AllRects, RectObstacle } from '../../data/shipData.js';
import { shipGenerator, freezeCopy } from '../helpFunctions.js';
import { draw } from './draw.js';
import { getSpeeds, checkKeyPressed, checkKeyReleased, getGunLocation, firingSolutions,
        checkGunStatuses, collisionTest, dealDamage } from './battleFunctions.js';
import { spaceAiActions, chooseCheckPoint } from './aiFunctions.js';

// place for gameObject
export var gameObject = null;

export function shipActions(ship) {
  // need to set max and min speeds....
  //console.log('sA, ship', ship.name, freezeCopy(ship.x));
  if (ship.disabled === false) {
    // accelerate
    if (ship.accelerate) {
      if (ship.power > ship.speed) {ship.speed += 0.1}
    }
    // break
    if (ship.braking) {
      if (ship.speed > -1) {ship.speed -= 0.03}
    }
    // turnLeft
    if (ship.turnLeft) { ship.heading -= 4;}
    // turnRight
    if (ship.turnRight) { ship.heading += 4;}
    // fire, star = right, port = left
    if (ship.fireFront) { firingSolutions(ship, ship.frontGuns, 'front', ship.heading); }
    if (ship.fireStar) { firingSolutions(ship, ship.starGuns, 'star', ship.heading + 90); }
    if (ship.firePort) { firingSolutions(ship, ship.portGuns, 'port', ship.heading - 90); }
  }
  //console.log('heading and speed: ', ship.heading, ship.speed);
  const speeds = getSpeeds(ship.heading, ship.speed);
  // update x and y for collision test purpose
  ship.setCorners(ship.heading);
  //console.log('corners set', ship.name, freezeCopy(ship.x));
  const checkCollision = collisionTest(ship, true);
  // collision!
  if (checkCollision !== false) {
    // if not a wall
    if (checkCollision !== 'obstacle!') {
      // make collision damages based on masses or something etc.
      const ramDamage = ship.mass - checkCollision.mass;
      //console.log('ramDamage ', ramDamage);
      // need to have a cooldown to ram damage or this would make 20x damage..
      if (ship.ramCoolDown === false) {
        ship.ramCoolDown = true;
        setTimeout( () => {
          ship.ramCoolDown = false;
        }, 1000);
        // ram damage:
        if (ramDamage >= 0) {
          checkCollision.hitPoints -= ramDamage;
          ship.hitPoints -= ramDamage / 4;
        } else {
          ship.hitPoints += ramDamage;
          checkCollision.hitPoints += ramDamage / 4;
        }
        if (checkCollision.hitPonts < 1) { checkCollision.destroy();}
        if (ship.hitPonts < 1) { ship.destroy();}
      }
    }
  } else {
    // if no collision, move the ship
  //console.log('before move', ship.name, freezeCopy(ship.x));
    //console.log('speeds: ', freezeCopy(speeds));
    //console.log('speedsx: ', freezeCopy(speeds.x));
    //console.log('speedsy: ', freezeCopy(speeds.y));
    ship.x += -speeds.x;
    ship.y += speeds.y;
  //console.log('after move', ship.name, freezeCopy(ship.x));
  }
  // set statuses of cannon batteries:
  const cannonStatuses = checkGunStatuses(ship);
  if (cannonStatuses.frontGuns.totalEnergy <= ship.energy && cannonStatuses.frontGuns.totalCoolDown === false) {
    ship.frontStatus = 'aquamarine';
  } else { ship.frontStatus = 'crimson'; }
  if (cannonStatuses.starGuns.totalEnergy <= ship.energy && cannonStatuses.starGuns.totalCoolDown === false) {
    ship.starStatus = 'aquamarine';
  } else { ship.starStatus = 'crimson'; }
  if (cannonStatuses.portGuns.totalEnergy <= ship.energy && cannonStatuses.portGuns.totalCoolDown === false) {
    ship.portStatus = 'aquamarine';
  } else { ship.portStatus = 'crimson'; }
}

export function bulletActions(bullet) {
  for (let i = 0; i < bullet.speed; i++) {
    if (bullet.live) {
      // move bullet 1 px
      const speeds = getSpeeds(bullet.heading, 1);
      // add travel
      bullet.travelled++;
      bullet.x += -speeds.x;
      bullet.y += speeds.y;
      bullet.setCorners(bullet.heading);
      //console.log(JSON.parse(JSON.stringify(bullet.x)), bullet.y);
      // check collision
      const checkCollision = collisionTest(bullet, false);
      // hit!
      if (checkCollision !== false){
        if (checkCollision !== 'obstacle!') {
          // make damage
          let damageDealt = dealDamage(bullet.power, checkCollision.armour.front, 0);
          if (damageDealt < 0) { damageDealt = 0 }
          // check hit points and shield points
          console.log('damage dealt: ', freezeCopy(damageDealt));
          let oldData = checkCollision.showBattleData;
          console.log('old data: ', freezeCopy(oldData));
          // shields absorbing
          for (; oldData[1] > 0 && damageDealt > 0 ;) {
            oldData[1]--;
            damageDealt--;
            console.log('shields absorbing 1');
          }
          console.log('after shields: ', damageDealt, oldData);
          // make damage
          oldData[0] -= damageDealt;
          console.log('oldData after dmg dealt: ', freezeCopy(oldData));
          checkCollision.updateBattleData(oldData);
          // destroy if 0 hit points
          if (oldData[0] <= 0) {
            checkCollision.destroy();
            console.log('ship destroyed!');
          }
        }
        // destroy bullet
        bullet.destroy();
      }
      // if range is full
      if (bullet.travelled >= bullet.range) {bullet.destroy();}
    }
  }
}

export function animate(){
  if (gameObject !== null) {
    const keyDownListeners = window.addEventListener("keydown", checkKeyPressed, false);
    const keyUpListeners = window.addEventListener("keyup", checkKeyReleased, false);
    //console.log('gameObject var ', gameObject);
    //console.log('gObject ', gObject);
    if (gameObject.battleObject.pause) {
      // game on pause
      // if battle has ended, end the battle:
      if (gameObject.battleObject.finished) { console.log('battle finished');}
      // draw pause menu, that has atleast option to continue game...
    } else {
      // ai decisions:  (ai ship, opponent of ai)
      spaceAiActions(gameObject.battleObject.ships[1], gameObject.battleObject.ships[0], gameObject.battleObject);
      // actions of ships
      gameObject.battleObject.ships.forEach( ship => {
        shipActions(ship);
      });
      // actions of bullets
      gameObject.battleObject.bullets.forEach( bullet => {
        if (bullet.live) {
          bulletActions(bullet);
        }
      });
      // clean dead bullets
      if (gameObject.battleObject.bullets.length > 20) {
        gameObject.battleObject.bullets.shift();
      }
      // draw
      draw(gameObject.battleObject);
    }
    // check if battle is over:
    gameObject.battleObject.ships.forEach( ship => {
      if ( ship.hitPoints < 1) { ship.destroy(); }
      if (ship.disabled === true) {
        gameObject.battleObject.pause = true;
        gameObject.battleObject.finished = true;
      }
    });
    //battleData only on bugfix purposes:
    /*
    document.getElementById('infoPlace').innerHTML = `hp: ${gameObject.battleObject.ships[0].showBattleData[0]}
   sp: ${gameObject.battleObject.ships[0].showBattleData[1]} e: ${gameObject.battleObject.ships[0].showBattleData[2]}`;
    */
      /*
    `${gameObject.battleObject.ships[0].x} ${gameObject.battleObject.ships[0].y}
    ${gameObject.battleObject.ships[1].x} ${gameObject.battleObject.ships[1].y}`;
    */
    if (gameObject.battleObject.finished !== true) {
      const battleAnimation = window.requestAnimationFrame(animate);
    } else {
      console.log('finished === true');
    }    
  }
}

export function startAnimation(gObject) {
  gameObject = gObject;
  animate();
}
//window.onload = ( () => {
export function startSpaceCombat(gameData){
  gameObject = gameData.gameObject;
  // load gameObject from store
  //gameObject = JSON.parse(localStorage.getItem('Go'));
// test ships:
// this could be at gameObject at players ship place for player 1...
// for ai pilots this would be generated here
const testShip = new Starship('TestShip1', 'Zaab 01', 'Vartzila Space 1', ['Arcanis Shield'],
                              {front: 'ValMet S1', star: 'ValMet S1', port: 'ValMet S1'});
  /* big ship:
const testShip = new Starship('TestShip1', 'Juggernaut', 'Vartzila Military', ['Arcanis Shield'],
                              {front: 'Spaceviper', star: 'Spaceviper', port: 'Spaceviper'});
*/
  const testShip2 = new Starship('TestShip2', 'Zaab 01', 'Vartzila Space 1', ['Arcanis Shield'],
                              {front: 'ValMet S1', star: 'ValMet S1', port: 'ValMet S1'});

// generate ships by parts. target, startlocation, colors, pilot
// get here from gameObject = player.ship and gameData.aiShips.filter that matches gameData.travelTarget
const ship1 = shipGenerator(testShip, 0, ['white', 'blue'], gameObject.player.name);
const ship2 = shipGenerator(testShip2, 3, ['red', 'cyan'], 'mister compu');
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
console.log('test ships ', testShip, testShip2);
console.log('ship1 ship2 ', ship1, ship2);
battleObject.ships.push(ship1);
battleObject.ships.push(ship2);
  console.log('battleObject: ', battleObject);
battleObject.ships.forEach( ship => {
  // update of "corners" for rotation etc.
  ship.setCorners(ship.heading);
  // set timer for energy regen
  // need stopper for this... for example when other ship is destroyed
  const shieldInterval = window.setInterval( () => {
    console.log('shield interval for ', ship.name);
    if (ship.energy < ship.maxEnergy) {
      ship.energy += ship.power;
      if (ship.energy > ship.maxEnergy) {
        ship.energy = ship.maxEnergy;
      }
    }
    if (battleObject.finished) {
      console.log('clearing shield interval');
      window.clearInterval(shieldInterval);
      }
  }, 3000);
});
// this checks if battle is over to kill the animation
/*
const battleChecker = window.setInterval( () => {
  if (battleObject.finished) {
    console.log('battlechecked interval');
    window.cancelAnimationFrame(battleAnimation);
    window.clearInterval(battleChecker);
  }
}, 1500);
  */
// corners for obstacles (for example area walls)
battleObject.obstacles.forEach( obs => {
  obs.setCorners(obs.angle);
});
// make checkPoints for ai navigation
battleObject.checkPoints = [{x: 50, y: 90},{x: 850, y: 90},{x: 50, y: 450},{x: 850, y: 450},{x: 110, y: 250},{x: 850, y: 100},{x: 321, y: 111}];
  // choose the first checkPoint for ai ship.
battleObject.chosenCp = chooseCheckPoint(battleObject.ships[1], battleObject.checkPoints);
// draw with battle object
//draw(battleObject);
gameObject.battleObject = battleObject;
console.log('gameObject.battleObject',gameObject.battleObject);
animate();
}
//});
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
