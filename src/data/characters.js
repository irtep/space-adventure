//import { Character, Race, Profession } from './classes.js';
export class Race { // bodyparts in body are needed to check what weapon or armour needs
  constructor(name, stats, desc, body, size, unarmed, specialAttacks, img, artBy) {
    this.name = name; this.stats = stats; this.desc = desc; this.body = body;
    this.size = size; this.unarmed = unarmed; this.img = img; this.artBy = null;
    this.specialAttacks = specialAttacks;
  }
}

export class Profession {
  constructor(name, stats, desc, specialAttacks, img, artBy) {
    this.name = name; this.stats = stats; this.desc = desc; this.specialAttacks = specialAttacks;
    this.img = img; this.artBy = artBy;
  }
}
export class Character {               // 'armour' is name of armour that he is wearing
  constructor(player, name, race, profession, rank, armour, weapons, meleeExp, shootExp, specialAttacks, injury, live, desc) {
    this.player = player; this.name = name; this.race = race; this.profession = profession; this.rank = rank;
    this.armour = armour; this.weapons = weapons; this.meleeExp = meleeExp; this.shootExp = shootExp;
    this.specialAttacks = specialAttacks; this.injury = injury; this.live = live; this.desc = desc;
  }
  move() {
  }
  attack(selectedAttack, target) {
  }
  // destroy this character
  destroy() {
    this.live = false;
    this.x = null;
    this.y = null;
  }
}
// CHARACTERS:
// (player, name, race, guild, rank, armour, weapons, meleeExp, shootExp, stats, specialAttacks, injury, live)
export const characters = [

  new Character(
    // players, name, race, guild, rank, armour, weapons, meleeExp, shootExp,
  true, 'Pontus', 'Dogfolk', 'Police', 'rookie', null, [], 0, 0,
    // specialAttacks, injury (0 is no injury), live
    [], 0, true, `Young but very spirited dogfolk.`
  ),

  new Character(
    // players, name, race, guild, rank, armour, weapons, meleeExp, shootExp,
  false, 'Steelman', 'Dreadnought', 'Raider', 'rookie', null, ['dreadnought fist', 'heavy flamer'], 0, 0,
    // specialAttacks, injury (0 is no injury), live
    [], 0, true, `Old war veteran who got injured, but luckily had enough money to get this huge exoskeleton.`
  ),

  new Character(
    // players, name, race, guild, rank, armour, weapons, meleeExp, shootExp,
  false, 'IronFist', 'Dreadnought', 'Raider', 'veteran', null, ['dreadnought fist', 'heavy flamer'], 0, 0,
    // specialAttacks, injury (0 is no injury), live
    [], 0, true, `Veteran dreadnought who usually crushes everyone in his path.`
  ),
  new Character(
    // players, name, race, guild, rank, armour, weapons, meleeExp, shootExp,
  false, 'Queen', 'Dogfolk', 'Freelancer', 'grandmaster', null, [], 0, 0,
    // specialAttacks, injury (0 is no injury), live, desc
    [], 0, true, `Extremely tough female dogfolk.`
  ),
  new Character(false, 'Ryszard', 'Human', 'Smuggler', 'rookie', 'kevlar breastplate', ['victorivich rifle'], 0, 0,
    [], 0, true, `Experienced smuggler rifleman`
  )
];

// RACES
// (name, stats, desc, body, size, unarmed, specialAttacks, img, artBy)
export const races = [
  new Race('Dogfolk', {str: 11, con: 14, speed: 7, attacks: 3, def: 15}, 'Dogfolks are like very big dogs, but as intelligents as humans.',
           {heads: 1, hands: 0, claws: 2, torso: 0}, 10, 'bite',
           null, /* should add some special attacks later*/
          'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2FScreenshot%202019-09-26%20at%208.30.56.png?v=1569475960131',
          'Yuko R'),

  new Race('Dreadnought', {str: 13, con: 20, speed: 4, attacks: 1, def: 10}, `You are crippled human, but it doesn't matter as you have this powerful exoskeleton,
that makes you way more powerful than most of the creatures around the galaxy.`,
          {heads: 0, hands: 2, claws: 0, torso: 0}, 30, 'punch',
           null, /* should add some special attacks later*/
           'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fdread.png?v=1569043619713',
           'amorcitos.'
          ),

  new Race('Human', {str: 7, con: 10, speed: 5, attacks: 1, def: 13}, `The most common known race in the galaxy. Very successfull and creative
race that seems to get better all the time. However their power relies heavily in combining forces so 1v1 other races usually excel better.`,
          {heads: 1, hands: 2, claws: 0, torso: 1}, 10, 'punch',
           null, /* should add some special attacks later*/
           'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fdread.png?v=1569043619713',
           null
          )
];

// PROFESSIONS
// (name, stats, desc, specialAttacks, img)
export const professions = [
  new Profession('Police', {
    rookie: {str: 1, con: 0, speed: 0, attacks: 0, ws: 6, bs: 7, def: 0},
    veteran: {str: 1, con: 1, speed: 0, attacks: 0, ws: 6, bs: 7, def: 0},
    elite: {str: 1, con: 1, speed: 1, attacks: 1, ws: 6, bs: 8, def: 0},
    master: {str: 1, con: 2, speed: 1, attacks: 1, ws: 7, bs: 8, def: 1},
    grandmaster: {str: 1, con: 2, speed: 1, attacks: 2, ws: 7, bs: 9, def: 2}
  }, `Galactic Police Force (GPF) maintains peace and order in sector.
starting police officers get as a starting bonus, police-class cannons and shields to his ship and intresting and dangerous missions from raiding criminal
outposts to patrols to keep trade routes safe. Polices receive good melee and excellent shooting training.`,
  null /* should add some special attacks later*/,
  null
  ),
  new Profession('Raider', {
    rookie: {str: 1, con: 0, speed: 0, attacks: 0, ws: 7, bs: 6, def: 0},
    veteran: {str: 1, con: 1, speed: 0, attacks: 0, ws: 7, bs: 6, def: 0},
    elite: {str: 1, con: 1, speed: 1, attacks: 1, ws: 7, bs: 7, def: 0},
    master: {str: 2, con: 1, speed: 1, attacks: 2, ws: 8, bs: 7, def: 1},
    grandmaster: {str: 2, con: 2, speed: 1, attacks: 3, ws: 9, bs: 7, def: 2}
  }, `Raiders is an alliance of outlaw captains who make their living by robbing freighters and remote outposts.
They give you an adventurous career that include raid missions and clashes againts Police Force.
As an extra help to start new Raider member gets pretty good forward cannon to his ship and a better scanner to find prey.
In combat raiders concentrate in melee skills.`,
  null /* should add some special attacks later*/,
  null
  ),
  new Profession('Smuggler', {
    rookie: {str: 1, con: 0, speed: 0, attacks: 0, ws: 5, bs: 6, def: 1},
    veteran: {str: 1, con: 1, speed: 1, attacks: 0, ws: 5, bs: 6, def: 1},
    elite: {str: 1, con: 1, speed: 1, attacks: 1, ws: 5, bs: 7, def: 1},
    master: {str: 1, con: 1, speed: 2, attacks: 1, ws: 6, bs: 7, def: 2},
    grandmaster: {str: 2, con: 2, speed: 2, attacks: 2, ws: 6, bs: 8, def: 3}
  },`If you think that legal goods won't give you enough profits, as you can make much more money with illegal stuff like slaves, illegal imigrants and narcotics. Then the Smugglers are what you are looking for.
Starting bonus is upgraded engine and some extra armour to keep a distance to hand of so called justice.
They shoot better than hit in personal combat.`,
  null /* should add some special attacks later*/,
  null
  ),
  new Profession('Merchant', {
    rookie: {str: 0, con: 1, speed: 0, attacks: 0, ws: 5, bs: 6, def: 1},
    veteran: {str: 0, con: 2, speed: 1, attacks: 0, ws: 5, bs: 6, def: 1},
    elite: {str: 0, con: 2, speed: 1, attacks: 1, ws: 5, bs: 7, def: 1},
    master: {str: 0, con: 2, speed: 2, attacks: 1, ws: 6, bs: 7, def: 2},
    grandmaster: {str: 2, con: 3, speed: 2, attacks: 2, ws: 6, bs: 8, def: 3}
  },`If you don't like enforcing law or breaking it, one option is to do some greens by trading. Merchants are respected traders who do business all around the galaxy. Merchants starter ship contains bigger cargo space and faster engines to deliver faster and more valuables for more profit. They shoot better than brawl in closecombat.`,
  null /* should add some special attacks later*/,
  null
  ),
  new Profession('Freelancer', {
    rookie: {str: 1, con: 0, speed: 0, attacks: 0, ws: 5, bs: 5, def: 0},
    veteran: {str: 1, con: 1, speed: 0, attacks: 0, ws: 5, bs: 5, def: 0},
    elite: {str: 1, con: 1, speed: 1, attacks: 1, ws: 6, bs: 6, def: 1},
    master: {str: 1, con: 1, speed: 2, attacks: 1, ws: 6, bs: 6, def: 1},
    grandmaster: {str: 1, con: 1, speed: 3, attacks: 2, ws: 7, bs: 7, def: 3}
  }, `Instead of doing jobs for other people, why not to work for yourself? You will not get any starter bonuses but you are free to do whatever missions you like!
Maybe do some intergalactic trading or bounty hunting?. In combat they can do both, shoot and brawl.`,
  null /* should add some special attacks later*/,
  null
  ),
];
