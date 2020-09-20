
import { StarSystem, Location, Station } from './classes.js';

// Star systems:
// constructor: name, desc, security, stations, locations, locatedAt, image, artBy
export const systems = [
  // canvas is 900 x 400
  new StarSystem('Sol', 'Birthplace of the human race. Nowadays well populated center of trading. Has 6 dockable ports.',
    'Pretty much safe place. However have some dangerous areas too. Strong police presence.',
    ['Venus Battery Charging ltd.','Earth Trading Center', 'Luna Station', 'Mars Docks', 'Saturnus Mining Center', 'Jupiter Mining Center', 'Uranus Outpost'],
    [  // name, desc, dangerRating, stations, coords, color, visitable, size, image
    new Location('Sun', 'Bright nice sun. No reason to travel here really. Image by Wikipedia.',
     0, 
    new Station(
    'Sol',
    'No base here.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [],
    // sells:
    [],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ), {x: 450, y: 200}, 'yellow', false, 50, 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg'),
    new Location('Mercury', 'Small planet near the sun. Very hot, lots of radiation. It has small battery charging station orbitin it. Image by Wikipedia.',
     2, 
    new Station(
    'Mercury battery charging center.',
    'Near sun, so its ideal place for battery charging plant.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['common metals', 105, false],
      ['water', 100, false],
      ['rare metals', 110, false]
    ],
    // sells:
    [
      ['drugs', 100, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ),  {x: 560, y: 170}, 'brown', true, 5, 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg'),
    new Location('Venus', 'Hot nice planet. It has in low orbit quite populated floating city called Venus City.',
    2, 
    new Station(
    'Venus City',
    'Populated city. That has some industrial plants. Image by Wikipedia.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['common metals', 100, false],
      ['water', 120, false],
      ['drugs', 100, true]
    ],
    // sells:
    [
      ['weapons', 102, false],
      ['industrial products', 102, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ),  {x: 560, y: 280}, 'orange', true, 7, 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg'),
    new Location('Earth', 'Legendary birth place of the human race. Center of the solar system. HQ of the Galatic Police Force is located here.',
    1, new Station(
    'Earth Trading Center',
    'Center of the Solar System. Major trading hub. As mining is banned in earth, metals and other minerals are always welcome here along some other goods.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['common metals', 110, false],
      ['rare metals', 120, false],
      ['water', 70, false],
      ['drugs', 130, true]
    ],
    // sells:
    [
      ['water', 150, false],
      ['weapons', 100, false],
      ['industrial products', 105, false],
      ['food', 105, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    )
    ,  {x: 340, y: 290}, 'blue', true, 7, 
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Ftierra.jpg?v=1571323740231',
    'amorcitos'),
    new Location('Mars', 'The red planet. The second biggest human population after earth. Image by Wikipedia.', 2, 
    new Station(
    'Mars Orbit Intergalactic Center',
    'Neutral space station of Mars, the second biggest human population after earth. Most of the trading of Mars is done here,',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['weapons', 95, false],
      ['water', 110, false],
      ['food', 110, false],
      ['drugs', 90, true]
    ],
    // sells:
    [
      ['common metals', 95, false],
      ['weapons', 95, false],
      ['rare metals', 99, false],
      ['industrial products', 105, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    )
    ,  {x: 380, y: 320}, 'red', true, 7, 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'),
    new Location('Asteroid belt station', 'Lots of asteroids. Image by Wikipedia.', 4, 
    new Station(
    'Asteroid belt station 1.',
    'Asteroid belt has solid stock of minerals and even some ice that can be sold as water. This station located on Ceres, is market to sell products get from all this belt.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['industrial products', 105, false],
      ['food', 105, false],
      ['drugs', 105, false],
      ['slaves', 100, true]
    ],
    // sells:
    [
      ['common metals', 85, false],
      ['rare metals', 85, false],
      ['water', 100, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ),  {x: 550, y: 100}, 'gray', true, 2, 'https://upload.wikimedia.org/wikipedia/commons/f/f3/InnerSolarSystem-en.png'),
    new Location('Jupiter', 'Biggest planet around with some moons. Jupiter has many moons that have operations like mining, industrial plants etc. Image by Wikipedia.', 2, 
    new Station(
    'Jupiter Moons Trading Hub',
    'Jupiter has many moons that have operations like mining, industrial plants etc.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['slaves', 100, false],
      ['food', 100, false],
      ['water', 100, true]
    ],
    // sells:
    [
      ['common metals', 95, false],
      ['rare metals', 80, false],
      ['industrial products', 90, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ),  {x: 720, y: 300}, 'crimson', true, 20, 'https://upload.wikimedia.org/wikipedia/commons/5/50/Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019_-_Edited.jpg'),
    new Location('Saturnus', 'Big and beautiful with some many moons. Big trading center between many local moons and the rest of the space. Image by Grace McLoughlin.', 2, 
    new Station(
    'Saturnus Station',
    'Big trading center between many local moons and the rest of the space.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['food', 100, false],
      ['water', 100, false],
      ['industrial products', 100, true]
    ],
    // sells:
    [
      ['common metals', 95, false],
      ['rare metals', 99, false],
      ['weapons', 110, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ), {x: 200, y: 280}, 'orange', true, 15, 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fsaturnus.png?v=1572709893543', 'Grace M.'),
    new Location('Uranus', 'Uranus has a good water supply in icy moons along with other mining operations. However laws long reach doesnt reach here, so it is controlled by local kings and crime lords. Image by Wikipedia.', 3, 
    new Station(
    'Uranus Station',
    'Uranus has a good water supply in icy moons along with other mining operations. However laws long reach doesnt reach here, so it is controlled by local kings and crime lords.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['rare metals', 110, false],
      ['food', 110, false],
      ['drugs', 110, true],
      ['industrial products', false],
      ['weapons', 105, false]
    ],
    // sells:
    [
      ['common metals', 100, false],
      ['water', 90, false],
      ['slaves', 100, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ), {x: 150, y: 90}, 'blue', true, 15, 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg'),
    new Location('Neptune', 'Other big cold planet. Good water supply with lots of ice mining on its moons. Recently Police force has started this small base to outer Sol, to fight slavery and illegal trading in zone. However it has limited resources, but atleast something it is something. Image by Wikipedia.', 3,  
     new Station(
    'Neptune Star Base',
    'Recently Police force has started this small base to outer Sol, to fight slavery and illegal trading in zone. However it has limited resources, but atleast something it is something.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['food', 110, false],
      ['water', 110, false],
      ['weapons', 100, true]
    ],
    // sells:
    [
      ['common metals', 100, false],
      ['rare metals', 100, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    ), {x: 50, y: 200}, 'gray', true, 15, 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg'),
    new Location('Pluto', 'Small rock in space. Some say that this is planet, some say that it is not. There is a small space station that has some very small population. Mostly used by pirates and smugglers to trade stuff. Image by Wikipedia.', 1,  
    new Station(
    'Pluto space station',
    'Small space station that has some very small population. Mostly used by pirates and smugglers to trade stuff.',
    // missions:
    null,
    // buys:  // name, percentage of buy/sell price of baseValue, illegal
    [
      ['food', 114, false],
      ['industrial products', 111, false],
      ['drugs', 120, true],
      ['weapons', 104, true]
    ],
    // sells:
    [
      ['slaves', 95, false],
      ['water', 105, false]
    ],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    )
    , {x: 800, y: 20}, 'gray', true, 3, 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg')]
    ,
    // location in starmap:
    51,
    // image:
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fplanetas2.jpg?v=1572709487593',
    'Grace M.'
    ),  
  
  new StarSystem('Tingomaria', 'Tingomaria has 4 fertile planets, populated by various races.',
    'Can be pretty dangerous place as there are not much police presence.',
    ['station x','station y'],
    [  // name, desc, dangerRating, stations, coords, color, visitable, size, image
    new Location('Sun', 'Bright nice sun.',
     0, [], 1, 'yellow', false, 100, null),
    new Location('planet x', 'Small planet near the sun. Very hot, lots of radiation.',
     2, [], 2, 'brown', true, 10, null),
    new Location('planet y', 'Hot nice planet. Not much going on here, except small battery charging plant',
    2, [], 3, 'orange', true, 15, null),
    new Location('planet z', 'Legendary birth place of the human race. Center of the solar system. HQ of the Galatic Police Force is located here.',
    1, [new Station(
    'station 1',
    'cool place.',
    // missions:
    null,
    // buys:  // name, percentage of buying price of baseValue
    [
      ['common metals', 110],
      ['water', 70]
    ],
    // sells:
    [
      ['water', 150],
      ['military weapons', 100]],
    // illegals:
    ['migrants', 'drugs', 'slaves']
    )
    ], 4, 'blue', true, 15, 
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Ftierra.jpg?v=1571323740231'),
    new Location('Marx', 'The red planet.', 2, [], 5, 'red', false, 15, null),
    new Location('belt', 'Lots of asteroids.', 4, [], 6, 'gray', false, 3, null),
    new Location('iter', 'Biggest planet around with some moons.', 2, [], 7, 'crimson', false, 40, null),
    new Location('Saus', 'Big and beautiful with some moons.', 2, [], 8, 'orange', false, 30, null),
    new Location('Urus', 'Big cold planet.', 3, [], 9, 'blue', false, 30, null),
    ],
    // location in starmap:
    11,
    // image:
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Ftierra.jpg?v=1571323740231'             
    )
  ];
