import { tempGameObject } from '../../components/mainScreen/mainCanvas/MainCanvas.js';
import { Starship, AllRects } from '../../data/classes.js';
import { callDice } from '../helpFunctions.js';

export function checkGunStatuses(ship){
  const statuses = {frontGuns : {totalEnergy: 0, totalCoolDown: false},
  starGuns : {totalEnergy: 0, totalCoolDown: false},
  portGuns : {totalEnergy: 0, totalCoolDown: false}
  };
  
  ship.frontGuns.forEach( gun => { 
    statuses.frontGuns.totalEnergy += gun.energyUsage 
    if (gun.coolDown === true) { statuses.frontGuns.totalCoolDown = true}
  });
  ship.portGuns.forEach( gun => { 
    statuses.portGuns.totalEnergy += gun.energyUsage 
    if (gun.coolDown === true) { statuses.portGuns.totalCoolDown = true}
  });
  ship.starGuns.forEach( gun => { 
    statuses.starGuns.totalEnergy += gun.energyUsage 
    if (gun.coolDown === true) { statuses.starGuns.totalCoolDown = true}
  });
  
  return statuses;
}

export function dealDamage(power, armour, modificators) {
  let hitAt = null;
  
  // hits always "to front armor".. i might later add something that ids actual armor that was hit
  // other armours have also values, but they add hit points so they are not completely without use.
  return (power + callDice(16) + modificators) - armour;
}

export function firingSolutions(ship, battery, gLocation, heading) {
  
  for (let i = 0; i < battery.length; i++) {
      
    if (ship.energy >= battery[i].energyUsage && battery[i].coolDown !== true) {
      const gunLocation = getGunLocation(i+1, battery.length, gLocation, ship);
          
      // shoot
      battery[i].shoot(ship.name, gunLocation.x, gunLocation.y, heading, tempGameObject.battleObject.bullets); 
      // deduct energy
      ship.energy -= battery[i].energyUsage;
      // set cooldown if this was the last shot
      if (i + 1 === battery.length) {
        
        battery[i].coolDown = true;
        // start to count cooldown down
        setTimeout( () => { battery[i].coolDown = false }, battery[i].reloadTime*100);  
      }
      // push gun location to mark it to draw as to test
      /*
      const guns = {x: gunLocation.x, y: gunLocation.y};
      tempGameObject.battleObject.guns.push(guns);
     */    
    }
  }         
}
// gets x and y from point to another, 1 is full distance
function getXY(from, to, distance) {
  const newX = from + (to - from) * distance;
  const newY = from + (to - from) * distance;
  
  return { x: newX, y: newY };
}

export function getGunLocation(gunNbr, slots, battery, ship) {
  
  if (battery === 'front') {
      const multiplier = (1 / (slots + 1)) * gunNbr; 
    
      const gunSlotX = getXY(ship.rightTopCorner.x, ship.rightBottomCorner.x, multiplier).x;
      const gunSlotY = getXY(ship.rightTopCorner.y, ship.rightBottomCorner.y, multiplier).y;
      
      return {x: gunSlotX, y: gunSlotY};
  } 
  
  if (battery === 'star') { // right
      const multiplier = (1 / (slots + 1)) * gunNbr; 
    
      const gunSlotX = getXY(ship.rightBottomCorner.x, ship.leftBottomCorner.x, multiplier).x;
      const gunSlotY = getXY(ship.rightBottomCorner.y, ship.leftBottomCorner.y, multiplier).y;
      
      return {x: gunSlotX, y: gunSlotY};
  } 
  
  if (battery === 'port') { // left
      const multiplier = (1 / (slots + 1)) * gunNbr; 
    
      const gunSlotX = getXY(ship.leftTopCorner.x, ship.rightTopCorner.x, multiplier).x;
      const gunSlotY = getXY(ship.leftTopCorner.y, ship.rightTopCorner.y, multiplier).y;
      
      return {x: gunSlotX, y: gunSlotY};
  } 
  
}

export function getSpeeds (rotation, speed) { 
  //console.log('rota, speeds', rotation, speed);
  const to_angles = Math.PI/180;
  
  return {
		y: Math.sin(rotation * to_angles) * speed,
		x: Math.cos(rotation * to_angles) * speed * -1,
	};
}

// key Listeners, tempGameObject.battleObject.ships[0] is players ship
export function checkKeyPressed(pressed){ 
  //if (tempGameObject !== null || tempGameObject !== undefined) {
    // ref: https://keycode.info/
    switch (pressed.code) {
    
      // up  
      case 'ArrowUp': 
        tempGameObject.battleObject.ships[0].accelerate = true;
      break;
      
        // shift, for alternative acceleration 
      case 'ShiftRight': 
        tempGameObject.battleObject.ships[0].accelerate = true;
      break;
        
      // down
      case 'ArrowDown': 
        tempGameObject.battleObject.ships[0].braking = true;
      break;
        
      // left  
      case 'ArrowLeft': 
        tempGameObject.battleObject.ships[0].turnLeft = true;
      break;
        
      // right  
      case 'ArrowRight': 
        tempGameObject.battleObject.ships[0].turnRight = true;
      break;
        
      // fire front battery:
      case 'KeyW':
        tempGameObject.battleObject.ships[0].fireFront = true;
      break;
        
      // fire starboard battery (right):    
      case 'KeyD':
        tempGameObject.battleObject.ships[0].fireStar = true;
      break;   
        
      // fire port battery (left): 
      case 'KeyA':
        tempGameObject.battleObject.ships[0].firePort = true;
      break;
        
      default: console.log('not found this key(pressed)');  
  }

  //}
}
export function checkKeyReleased(released){
  switch (released.code) {
  
    // up  
    case 'ArrowUp': 
      tempGameObject.battleObject.ships[0].accelerate = false;     
      
    // shift, for alternative acceleration 
    case 'ShiftRight': 
      tempGameObject.battleObject.ships[0].accelerate = false;
    break;
    break;
    
    // down
    case 'ArrowDown': 
      tempGameObject.battleObject.ships[0].braking = false;
    break;
      
    // left  
    case 'ArrowLeft': 
      tempGameObject.battleObject.ships[0].turnLeft = false;
    break;
      
    // right  
    case 'ArrowRight': 
      tempGameObject.battleObject.ships[0].turnRight = false;
    break;     
      
    // fire front battery:
    case 'KeyW':
      tempGameObject.battleObject.ships[0].fireFront = false;
    break;
      
    // fire starboard battery (right):    
    case 'KeyD':
      tempGameObject.battleObject.ships[0].fireStar = false;
    break;   
      
    // fire port battery (left): 
    case 'KeyA':
      tempGameObject.battleObject.ships[0].firePort = false;
    break;
      
    default: console.log('not found this key(released) ');  
  }
}


/*  
  RECTANGLE BASED COLLISION TEST: 
*/
function pointInPoly(verties, testx, testy) { 
  var i;
  var j;
  var c = 0;
  var nvert = verties.length;
  
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
  
    if (((verties[i].y > testy) != (verties[j].y > testy)) && (testx < (verties[j].x - verties[i].x) * (testy - verties[i].y) / (verties[j].y - verties[i].y) + verties[i].x))
                    c = !c;
  }
  return c;
}

function testCollision(rectangle) {
  var collision = false;
  //console.log('testC ', rectangle);
  this.getCorners().forEach((corner) => {
    var isCollided = pointInPoly(rectangle.getCorners(), corner.x, corner.y);
                
    if (isCollided) collision = true;
  });
  return collision;
}

// bring "full objects" like car or tempGameObject.race.track[0].obstacles[0]
// example: checkRectangleCollision(car, tempGameObject.race.track[0].obstacles[0]);
function checkRectangleCollision(rect, rect2) {
  //console.log('cRC ', rect, rect2);
  if (testCollision.call(rect, rect2)) return true;
  else if (testCollision.call(rect2, rect)) return true;
  return false;
}

// collision test starts here
export function collisionTest(object, isShip) {
  const noCollision = false;
  let compareName = object.name;
  
  // if bullet can't use objects name to check if same
  if (isShip === false) { compareName = object.from };
  
  // check if collision with ships
  for (let i = 0; i < tempGameObject.battleObject.ships.length; i++) {
    // lets not compare with same ship.
    if (compareName !== tempGameObject.battleObject.ships[i].name) {
      
      const testResult = checkRectangleCollision(object, tempGameObject.battleObject.ships[i]);
      //console.log('test: ', tempGameObject.battleObject.ships[i]);
      if (testResult) { return tempGameObject.battleObject.ships[i]; }   
    }  
  }
  
  // check collision with walls:
  for (let i = 0; i < tempGameObject.battleObject.obstacles.length; i++) {
      
      const testResult = checkRectangleCollision(object, tempGameObject.battleObject.obstacles[i]);
      //console.log('test: ', tempGameObject.battleObject.obstacles[i]);
      if (testResult) { return 'obstacle!' }   
  }  
  
  // if no collisions:
  return noCollision;
}