import { callDice } from '../functions/helpFunctions.js';

export class StarSystem {
  constructor(name, desc, security, stations, locations, locatedAt, image, artBy){
    this.name = name;
    this.desc = desc;
    this.security = security;
    this.stations = stations;
    this.locations = locations;
    this.locatedAt = locatedAt; // 5x5 coords system, for example tingomaria is 11, sol 51, doesnt calculate these atm.
    this.image = image;
    this.artBy = artBy;
  };

  get showName() {
    return this.name;
  }

  get locationList() {
    return this.locations;
  }
}

export class Location {
  constructor(name, desc, dangerRating, stations, coords, color, visitable, size, image, artBy){
    this.name = name;
    this.desc = desc;
    this.dangerRating = dangerRating;
    this.stations = stations;
    this.missions = null;
    this.coords = coords;
    this.color = color;
    this.visitable = visitable;
    this.size = size;
    this.image = image;
    this.artBy = artBy;
  }
  // should have get atleast...
}

export class Station {
  constructor(name, desc, missions, buys, sells, illegals) {
    this.name = name;
    this.desc = desc;
    this.missions = missions;
    this.buys = buys;
    this.sells = sells;
    this.illegals = illegals;
  }
  // should have get atleast...
}

export class Good {
  constructor(name, desc, baseValue, typeOfGood) {
    this.name = name;
    this.desc = desc;
    this.baseValue = baseValue;
    this.typeOfGood = typeOfGood;
  }
  // should have get atleast...
}







/*
   Close Combat
*/


export class Armour {  // save is saving throw, requirements is what is needed to use
  constructor(name, value, save, requirements, img, artBy, desc, stats){
    this.name = name; this.value = value; this.save = save; this.requirements = requirements;
    this.img = img; this.artBy = artBy; this.desc = desc; this.stats = stats;
  }
}

export class Weapon {
  constructor(name, value, size, requirements, power, armourPiercing, minRange, maxRange, attacks, isMeleeWeapon, img, sound, artBy, desc) {
    this.name = name; this.value = value; this.size = size; this.requirements = requirements;
    this.power = power; this.armourPiercing = armourPiercing; this.maxRange = maxRange; this.img = img;
    this.sound = sound; this.artBy = artBy; this.minRange = minRange; this.isMeleeWeapon = isMeleeWeapon;
    this.attacks = attacks; this.desc = desc;
  }
}
