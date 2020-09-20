
import { motors, hulls, shipGuns, shipModules, Motor, ShipGun, ShipModule, Hull, Starship, ShipInCombat } from '../data/shipData.js';

// gets ships details and returns them as "power ratings"
// array jossa front ja sides...
export function giveRatings(ship) {
  //console.log('giving ratings: ', ship);
  //console.log('hulls: ', hulls);
  const shipsHull = hulls.filter( hull => hull.name === ship.hull);
  const shipsMotor = motors.filter( motor => motor.name === ship.motor);
  const shipsFrontGun = shipGuns.filter( gun => gun.name === ship.weapons.front);
  const shipsSideGun = shipGuns.filter( gun => gun.name === ship.weapons.port); // might add star later too.. and muliply by gun ports
  const shields = shipModules.filter( modu => modu.moduleType === 'shield');
  let shipsShield = null;
  for (let i = 0; i < ship.modules.length; i++) {
    for (let ii = 0; ii < shields.length; ii++) {
      if (ship.modules[i] === shields[ii].name) {
        shipsShield = shields[i];
      }
    };
  };
  const speedRating = shipsMotor[0].power * 2 + 20;
  const firePowerRating = ((shipsFrontGun[0].power + (shipsFrontGun[0].range / 65) - shipsFrontGun[0].energyUsage - (shipsFrontGun[0].reloadTime / 2) + shipsFrontGun[0].shieldPiercing) + (shipsSideGun[0].power + (shipsSideGun[0].range / 65) - shipsSideGun[0].energyUsage - shipsSideGun[0].reloadTime + shipsSideGun[0].shieldPiercing)) / 2 * 10;
  let defenceRating = shipsHull[0].armours.front + shipsHull[0].armours.sides + shipsHull[0].armours.back + (speedRating / 10);
  if (shipsShield !== null) {defenceRating += shipsShield.power};

  const ratings = {
    speed: speedRating,
    firePower: Math.round(firePowerRating),
    defence: defenceRating
  };
  return ratings;
};

// collision detects
  // arc vs arc
export function arcVsArc(sub, obj, subSize, objSize) {
  const dx = sub.x - obj.x;
  const dy = sub.y - obj.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < subSize + objSize) {
    return true;
  } else {
    return false;
  }
};
  // rect vs rect (in map)
export function rectVsRectInMap(rect1, rect2) {

  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y) {
      return true;
  } else {
    return false;
  }
}

export function distanceCheck(subj, obj) {
  const dx = subj.x - obj.x;
  const dy = subj.y - obj.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance;
};

// checks what direction to take to get fastest
export function checkRoute(from, to) {
  let distance = {index: null, distance: 5000};
  // all directions nw,n,ne,w,e,sw,s,se
  const dirs = [
    {x: from.x - 1, y: from.y - 1}, {x: from.x, y: from.y - 1}, {x: from.x + 1, y: from.y - 1},
    {x: from.x - 1, y: from.y}, {x: from.x, y: from.y}, {x: from.x + 1, y: from.y},
    {x: from.x - 1, y: from.y + 1}, {x: from.x, y: from.y + 1}, {x: from.x + 1, y: from.y + 1}
  ];
  dirs.forEach( (dir, idx) => {
    const distanceResult = distanceCheck(dir, to);

    if (distanceResult <= distance.distance) {
      distance.index = idx;
      distance.distance = distanceResult;
    };
  });
  return dirs[distance.index];
};

//selects correct ship for a player
export function getShip(playersName, shipsName, profession) {
  switch(profession) {
    case 'Police':
      // better cannons and a shield
      // (name, hull, motor, modules, weapons, value, desc, captain)
      return new Starship(shipsName, 'Zaab 01', 'Vartzila Military',
      [ // modules
        'Arcanis Shield', 'WatchTower'
      ],
      { // guns
        front: 'ValMet S1',
        star: 'ValMet S1',
        port: 'ValMet S1'
      },
      // value
      1000,
      'test ship number 1',
      playersName
      );
    break;
    case 'Raider':
      // better front gun and scanner
      return new Starship(shipsName, 'Zaab 01', 'Vartzila Military',
      [ // modules
        'Space Net'
      ],
      { // guns
        front: 'Spaceviper',
        star: 'ValMet S1',
        port: 'ValMet S1'
      },
      // value
      1000,
      'test ship number 1',
      playersName
      );
    break;
    case 'Smuggler':
      // better motor and armour
      return new Starship(shipsName, 'Rhino Mk1', 'Vartzila Military',
      [ // modules
        'WatchTower'
      ],
      { // guns
        front: 'ValMet S1',
        star: 'ValMet S1',
        port: 'ValMet S1'
      },
      // value
      1000,
      'test ship number 1',
      playersName
      );
    break;
    case 'Merchant':
      // better motor and cargo space
      return new Starship(shipsName, 'Zaab 01 HiAce', 'Vartzila Military',
      [ // modules
        'WatchTower'
      ],
      { // guns
        front: 'ValMet S1',
        star: 'ValMet S1',
        port: 'ValMet S1'
      },
      // value
      1000,
      'test ship number 1',
      playersName
      );
    break;
    case 'Freelancer':
      // standard ship
      return new Starship(shipsName, 'Zaab 01', 'Vartzila Military',
      [ // modules
        'WatchTower'
      ],
      { // guns
        front: 'ValMet S1',
        star: 'ValMet S1',
        port: 'ValMet S1'
      },
      // value
      1000,
      'test ship number 1',
      playersName
      );
    break;
    default: console.log('profession not found at getShip!');
  }
}
  // copy variable as it was at the moment
export function freezeCopy(target){
  return JSON.parse(JSON.stringify(target));
}

// calls random dice, for example 6 is 1d6
export function callDice(max){
    const result =  1 + Math.floor(Math.random() * max);
    return result;
}

// prepares ship for combat
export function shipGenerator(ship, startPlace, colors){
  // find parts:
  const parts = {
    hull : hulls.filter( hull => hull.name === ship.hull),
    motor : motors.filter( motor => motor.name === ship.motor),
    frontGuns : shipGuns.filter( gun => gun.name === ship.weapons.front ),
    starGuns: shipGuns.filter( gun => gun.name === ship.weapons.star ),
    portGuns: shipGuns.filter( gun => gun.name === ship.weapons.port ),
    shipModules: []
  };

  // start places: // 4 as i might add multiship combat at some points
  const startPlaces = [[20, 50], [900, 500], [200, 400], [900, 500]];
  // ship placeholder:
  let ship1 = new ShipInCombat(ship.name, startPlaces[startPlace][0], startPlaces[startPlace][1],
               [], [], []);

  // ships width and height
  ship1.w = parts.hull[0].width; ship1.h = parts.hull[0].height;
  // ships speed and energy
  ship1.power = parts.motor[0].power / 10;
  ship1.energy = parts.motor[0].power;
  ship1.maxEnergy = parts.motor[0].power;
  // energy regen rate
  ship1.refresh = parts.motor[0].refresh;

  // colors
  ship1.color1 = colors[0]; ship1.color2 = colors[1];

  //set guns stats
    // front:
  for (let i = 0; i < parts.hull[0].gunMounts.front; i++ ) {

    ship1.frontGuns.push(parts.frontGuns[0]);
  }
    // sides:
  for (let i = 0; i < parts.hull[0].gunMounts.star; i++ ) {
    ship1.starGuns.push(parts.starGuns[0]);
  }
  for (let i = 0; i < parts.hull[0].gunMounts.port; i++ ) {
    ship1.portGuns.push(parts.portGuns[0]);
  }

  ship1.frontStatus = 'aquamarine';
  ship1.portStatus = 'aquamarine';
  ship1.starStatus = 'aquamarine';

  // set ships armour, hit points, shield points and mass
  ship1.armour = parts.hull[0].armours;
  ship1.hitPoints = parts.hull[0].armours.front + parts.hull[0].armours.sides + parts.hull[0].armours.back;
  ship1.mass = ship1.hitPoints + parts.hull[0].maxModules;
  // if one of modules is shield, then shield points, if not, shieldPoints = 0:
  ship1.shieldPoints = 0;

  // add modules:
  ship.modules.forEach( module => {

    parts.shipModules.push(module);
    const foundMod = shipModules.filter( mod => mod.name === module );
    //console.log('fm sm ', foundMod, shipModules)
    if ( foundMod[0].moduleType === 'shield') {
      ship1.shieldPoints = foundMod[0].power;
    }
  });

  // ram cooldown or every ram ends the battle:
  ship1.ramCoolDown = false;

  // headings and speed
  if (startPlace === 3) {
    // for ai:
    ship1.heading = 180;
  } else { ship1.heading = 0; }
  ship1.speed = 0;
  // not disabled:
  ship1.disabled = false;
  ship1.setCorners(ship1.heading);

  return ship1;
}
/*
Police
Galactic Police Force (GPF) maintains peace and order in sector. starting police officers get as a starting bonus, police-class cannons and shields to his ship and intresting and dangerous missions from raiding criminal outposts to patrols to keep trade routes safe. Polices receive good melee and excellent shooting training.
Raider
Raiders is an alliance of outlaw captains who make their living by robbing freighters and remote outposts. They give you an adventurous career that include raid missions and clashes againts Police Force. As an extra help to start new Raider member gets pretty good forward cannon to his ship. In combat raiders concentrate in melee skills.
Smuggler
If you think that legal goods won't give you enough profits, as you can make much more money with illegal stuff like slaves, illegal imigrants and narcotics. Then the Smugglers are what you are looking for. Starting bonus is upgraded engine and some extra armour to keep a distance to hand of so called justice. They shoot better than hit in personal combat.
Merchant
If you don't like enforcing law or breaking it, one option is to do some greens by trading. Merchants are respected traders who do business all around the galaxy. Merchants starter ship contains bigger cargo space and faster engines to deliver faster and more valuables for more profit. They shoot better than brawl in closecombat.
Freelancer
Instead of doing jobs for other people, why not to work for yourself? You will not get any starter bonuses but you are free to do whatever missions you like! Maybe do some intergalactic trading or bounty hunting?. In combat they can do both, shoot and brawl.
*/
