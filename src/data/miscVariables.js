import { aiShips } from './shipData.js'

// gameObject that contains all player and planet data.
export const gameObject = {
  player: {

    name: null,
    profession: null,
    stats: null,
    money: 1000,
    weapons: null,
    armour: null,
    reputation: null,
    avatar: null,
    psw: null,
    planetLocation: 'Earth',
    systemLocation: 'Sol',
    travelStatus: 'docked at',
    travelTarget: null,
    mapCoords: {x: 340, y: 290},

    ship: null
    },

  aiShips : aiShips
};

// avatars for players and ai:s
// just temporal, later will use classes
export const avatars = [
  {name: 'bigDread', url: 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fdread.png?v=1569043619713', desc: `You are crippled human, but it doesn't matter as you have this powerful exoskeleton,
that makes you way more powerful than most of the creatures around the galaxy.`,
  stats: null,
  race: 'human',
  artBy: 'amorcitos'
  },
  {name: 'Pontitos', url: 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2FScreenshot%202019-09-26%20at%208.30.56.png?v=1569475960131',
  desc: `You are a proud member of Pontitos folk. Physically they resemble earth dogs, but are about as intelligent as humans.`,
  stats: null,
  race: 'pontito',
  artBy: 'Yuko R'
  }
];

// systems:
// This will be replaced with stuff that uses classes below...
// can be used as a reference to build the worlds
export const systemsTemporal = [
  {name: 'Sol',
  desc: 'Birthplace of the human race. Nowadays well populated center of trading. Has 6 dockable ports.',
  security: 'Mostly safe, however has some dangerous areas.',
  docks: ['Earth Trading Center', 'Luna Station', 'Mars Docks', 'Saturnus Mining Center', 'Jupiter Mining Center', 'Uranus Outpost'],
  map: `Sol system`
  },
  {name: 'El Agostin',
  desc: 'Dangerous place.',
  security: 'Dangerous.',
  docks: ['outlow1', 'outlow2', 'outlaw3']
  },
  {name: 'Tingomaria',
  desc: 'safe place, lots of forests. home of "elves"',
  security: 'oke.',
  docks: ['elf1', 'elf2', 'elf3', 'elf4', 'elf5']
  },
  {name: 'Drooklyn',
  desc: 'Dangerous place.',
  security: 'Dangerous.',
  docks: ['dar1', 'dar2', 'dar3']
  },
  {name: 'Safe Haven',
  desc: 'robotic place.',
  security: 'okey i guess.',
  docks: ['robt1', 'rob2', 'rob3', 'rob4', 'rob5']
  },
  {name: 'The Liberty Star',
  desc: 'capitalist place.',
  security: 'oke.',
  docks: ['m1', 'm2', 'm3']}
];
