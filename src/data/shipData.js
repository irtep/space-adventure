/*
   SHIP DATA:
*/
// this is for all rect shaped things in space battle.. so for about almost for everything.
// they get from here some stuff that they can be located, regardless of their angle
export class AllRects {

  // this is needed to check "real position" to get collision detect.
  // calculates and sets corners of rotated angles.
  // this was used as reference: https://stackoverflow.com/questions/41489627/collision-between-two-elements-with-rotating/41513341#41513341
  setCorners(angle) {

    function getRotatedTopLeftCornerOfRect(x, y, width, height, angle, rType) {
      //console.log('gRtLCOR ', x, y, width, height, angle);

      function sin(x) {
        return Math.sin(x / 180 * Math.PI);
      }

      function cos(x) {
        return Math.cos(x / 180 * Math.PI);
      }

      var center = {
        x: (x + width / 2),
        y: (y + height / 2)
      };

      // testBars for radar of ai's need to rotate from x and y
      if (rType === 'testBar') {
       center.x = x; center.y = y;
      }

      var vector = {
        x: (x - center.x),
        y: (y - center.y)
      };

      //console.log('vector: ',vector);
      var rotationMatrix = [[cos(angle), -sin(angle)],[sin(angle), cos(angle)]];

      var rotatedVector = {
        x: vector.x * rotationMatrix[0][0] + vector.y * rotationMatrix[0][1],
        y: vector.x * rotationMatrix[1][0] + vector.y * rotationMatrix[1][1]
      };

      return {
        x: (center.x + rotatedVector.x),
        y: (center.y + rotatedVector.y)
      };
    }

    function getAngleForNextCorner(anc,vectorLength) {
      var alpha = Math.acos(anc/vectorLength)*(180 / Math.PI);
      return 180 - alpha*2;
    }

    function getVectorLength(x, y, width, height){
     var center = {
       x: x + width / 2,
       y: y + height / 2
     };

    //console.log('center: ',center);
     var vector = {
       x: (x - center.x),
      y: (y - center.y)
     };
       return Math.sqrt(vector.x*vector.x+vector.y*vector.y);
    }

    this.leftTopCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle, this.rType);

    var vecLength = getVectorLength(this.x, this.y, this.w, this.h);
    //console.log('vecLength: ',vecLength);

    angle = angle+getAngleForNextCorner(this.w/2, vecLength);
    //console.log('angle: ',angle);
    this.rightTopCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle);

    angle = angle+getAngleForNextCorner(this.h/2, vecLength);
    //console.log('angle: ',angle);
    this.rightBottomCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle);

    angle = angle+getAngleForNextCorner(this.w/2, vecLength);
    //console.log('angle: ',angle);
    this.leftBottomCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle);

    //console.log('created rect ', this);
  };

  // return calculated corners:
  getCorners() {

    return [this.leftTopCorner,
      this.rightTopCorner,
      this.rightBottomCorner,
      this.leftBottomCorner];
  };
}
export class RectObstacle extends AllRects {
  constructor(x, y, w, h, color, angle, name) {
    super(); // to get setCorners from allRects
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.weight = 50; // default weight
    this.angle = angle;
    this.name = name;
    this.rType = 'building';
    this.hitPoints = 1000;
    this.maxHitPoints = 1000;
  }
}
export class RadarWave extends AllRects{
  constructor(x, y, heading, w, h, from) {
    super();
    this.x = x; this.y = y; this.heading = heading;
    this.w = w; this.h = h; this.live = true;
    this.from = from;
  }

  destroy() {
    this.live = false;
    this.x = null;
    this.y = null;
  }
}
// name, size, power, durability, value, refreshrate, desc
// disabling import and copying these to here, to tackle a bug
//import { Motor, ShipGun, ShipModule, Hull, Starship } from './classes.js';
export class Starship {
  constructor(name, hull, motor, modules, weapons, value, desc, captain, aiDetails){
    this.name = name;
    this.hull = hull;
    this.motor = motor;
    this.modules = modules;
    this.weapons = weapons;
    this.value = value;
    this.desc = desc;
    this.captain = captain;
    this.aiDetails = aiDetails;
    this.speed = 0;
    this.heading = 0;
    this.cargoBay = [];
    this.crew = [];
    this.disabled = false;
    this.engaged = false;
    //npc ship travel vars
    this.destination = null;
    this.nextPoint = 0;
    this.travelStatus = 'standBy';
    // ships control variables:
    this.accelerate = false;
    this.braking = false;
    this.turnLeft = false;
    this.turnRight = false;
    this.fireFront = false;
    this.fireStar = false;
    this.firePort = false;
    this.disabled = false;
  }
}

export class Hull {
  constructor(name, width, height, armours, maxModules, gunMounts, cargoSpace, value, desc) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.armours = armours;
    this.maxModules = maxModules;
    this.gunMounts = gunMounts;
    this.cargoSpace = cargoSpace;
    this.value = value;
    this.desc = desc;
  }
}

export class Motor {
  constructor(name, size, power, durability, value, refresh, desc) {
    this.name = name; this.size = size; this.power = power; this.durability = durability;
    this.value = value; this.refresh = refresh; this.desc = desc;
  }
}

export class ShipGun {
  constructor(name, reloadTime, energyUsage, power, shieldPiercing, color, speed, range, value, desc){
    this.name = name;
    this.reloadTime = reloadTime;
    this.energyUsage = energyUsage;
    this.power = power;
    this.shieldPiercing = shieldPiercing;
    this.color = color;
    this.speed = speed;
    this.range = range;
    this.value = value;
    this.desc = desc;
  }

  shoot(shooter, x, y, heading, pool){
    const newBullet = new Bullet(this.name, shooter, x, y, heading, this.power, this.shieldPiercing, this.range,
                                this.speed, this.color);

    newBullet.setCorners(newBullet.heading);
    pool.push(newBullet);
  }
}

export class ShipModule {
  constructor(name, size, energyUsage, power, moduleType, value, desc) {
    this.name = name; this.size = size; this.energyUsage = energyUsage; this.power = power;
    this.moduleType = moduleType; this.value = value; this.desc = desc;
  }
}
export class ShipInCombat extends AllRects {
  constructor(name, x, y, frontGuns, starGuns, portGuns) {
    super();
    this.name = name; this.x = x; this.y = y; this.frontGuns = frontGuns;
    this.starGuns = starGuns; this.portGuns = portGuns;
  }

  get showBattleData() {
    const battleData = [this.hitPoints, this.shieldPoints, this.energy, this.refresh];
    return battleData;
  }

  updateBattleData(newData) {
    this.hitPoints = newData[0];
    this.shieldPoints = newData[1];
  }

  destroy() {
    this.disabled = true;
    this.speed = 0;
  }
}

// name, reloadTime, energyUsage, power, shieldPiercing, color, speed, range, value, desc
export class Bullet extends AllRects{
  constructor(name, from, x, y, heading, power, shieldPiercing, range, speed, color) {
    super();
    this.name = name; this.from = from; this.x = x; this.y = y; this.heading = heading; this.power = power;
    this.shieldPiercing = shieldPiercing; this.range = range; this.travelled = 0; this.live = true;
    this.speed = speed; this.color = color;
    this.w = 3;
    this.h = 3;
  }

  destroy() {
    this.live = false;
    this.x = null;
    this.y = null;
  }
}

// PARTS ANDS SHIPS
export const hulls = [
  // name, width, height, armours, maxModules, gunMounts, cargoSpace, value, desc
  //         name,    w,  h,  armours                            maxModules,   guns, value, desc
  new Hull('Zaab 01', 20, 8, {front: 16, sides: 16, back: 11}, 10, {front: 1, star: 2, port: 2}, 10, 1000,
          'Reliable classic starship hull.'),
  new Hull('Rhino Mk1', 18, 7, {front: 18, sides: 17, back: 12}, 10, {front: 1, star: 2, port: 2}, 10, 1200,
          'Quite good armour and a bit nimbler so good for avoiding and taking hits.'),
  new Hull('Zaab 01 HiAce', 22, 10, {front: 16, sides: 16, back: 11}, 10, {front: 1, star: 2, port: 2}, 15, 1050,
          'Cargo version of a classic Zaab 01 hull. Very popular amongst merchants'),
  new Hull('Zaab 02', 30, 15, {front: 16, sides: 16, back: 11}, 13, {front: 2, star: 3, port: 3}, 17, 2500,
          'Extended version of classic Zaab 01.'),
  new Hull('Juggernaut', 45, 25, {front: 18, sides: 16, back: 15}, 23, {front: 3, star: 4, port: 4}, 25, 4500,
          'Huge starship hull capable to hold lots of cannons and modules.')
];

export const motors = [ // (name, size, power, durability, value, refresh, desc)
  // power need to be 10,20,30,40 or 50... or shipMove doesnt work at aiShipFunctions
  new Motor('Vartzila Space 1', 1,      10, 95, 1000, 1, 'Reliable but not very powerful engine.'),
  new Motor('Grayhound Type 1', 1,      10, 95, 1200, 2, 'Quite ok engine.'),
  new Motor('Vartzila Military', 2,     20, 95, 4000, 3, 'Great military class motor.'),
  new Motor('Powerhouse X', 3,          40, 95, 14000, 3, 'SuperFast motor.')
];
// name, reloadTime, energyUsage, power, shieldPiercing, color, speed, range, value, desc
export const shipGuns = [
  new ShipGun('ValMet S1', 10, 2, 12, 0, 'red', 20, 400, 300, 'good self-defence gun.'),
  new ShipGun('ValMet S1 GS', 11, 3, 13, 1, 'crimson', 20, 400, 300, 'ValMet Government Special is heavier version of standard VM S1 cannon.'),
  new ShipGun('Spaceviper', 15, 4, 16, 1, 'cyan', 20, 400, 1000, 'great gun.'),
  new ShipGun('StarDestroyer', 20, 15, 36, 5, 'white', 20, 500, 10000, 'Overshooting name, but incredible cannon.')
];
/*
    this.name = name; this.size = size; this.energyUsage = energyUsage, this.power = power; moduleType, value, this.desc = desc;
}
*/
export const shipModules = [
  // (name, size, energyUsage, power, moduleType, value, desc)
  // shields
  new ShipModule('Arcanis Shield', 1, 0, 10, 'shield', 1000, 'Basic energy shield. Protects pretty ok damage'),
  // scanners
  new ShipModule('WatchTower', 1, 0, 150, 'scanner', 1000, 'Basic scanner with quite low scanning range'),
  new ShipModule('Space Net', 1, 0, 250, 'scanner', 1200, 'Advanced scanner with ok scanning range')
];

export const aiShips = [
// (name, hull, motor, modules, weapons, value, desc, captain, aiDetails)
// {x: 340, y: 290}
  new Starship('Mars Xpress', 'Zaab 01', 'Powerhouse X',
  [ // modules
    'Arcanis Shield', 'WatchTower'
  ],
   // guns
    {
      front: 'StarDestroyer',
      star: 'StarDestroyer',
      port: 'StarDestroyer'
    }
  ,
  // value
  1000,
  'test ship number 1',
  'Kimi Rosberg',
  {
    located: {x: 320, y: 280},
    profession: 'Merchant',
    patrolRoute: ['Earth', 'Mars'],
    hunter: false,
    huntTarget: null,
    hunting: false
  }
   ),
  new Starship('Neptún', 'Zaab 01', 'Vartzila Space 1',
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
  'Captain Nemo',
  {
    located: {x: 550, y: 100},
    profession: 'Freelancer',
    patrolRoute: ['Venus', 'Earth', 'Pluto', 'Saturnus'],
    hunter: false,
    huntTarget: null,
    hunting: false
  }
   ),
  new Starship('Monitor', 'Zaab 01', 'Vartzila Space 1',
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
  'test ship number 2',
  'Grau',
  {
    located: {x: 380, y: 320},
    profession: 'Police',
    patrolRoute: ['Mercury', 'Venus', 'Earth', 'Asteroid belt station'],
    hunter: true,
    huntTarget: ['Raider', 'Smuggler'],
    hunting: false
  }
   ),
  new Starship('Vengeful Wraith', 'Juggernaut', 'Vartzila Military',
  [ // modules
    'Arcanis Shield', 'WatchTower'
  ],
  { // guns
    front: 'StarDestroyer',
    star: 'StarDestroyer',
    port: 'StarDestroyer'
  },
  // value
  1000,
  'test ship number 3',
  'Abaddon',
  {
    located: {x: 560, y: 280},
    profession: 'Raider',
    patrolRoute: ['Jupiter', 'Pluto', 'Uranus', 'Neptune', 'Uranus', 'Pluto'],
    hunter: true,
    huntTarget: ['Police', 'Freelancer', 'Merchant'],
    hunting: false
  }
   )
];
/*
{x: 560, y: 280}
{x: 380, y: 320}
{x: 550, y: 100}

 */
