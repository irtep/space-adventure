import { Good } from './classes.js';

/*
export class Goods {
  constructor(name, desc, baseValue, typeOfGood) 
*/

export const goods = [
  new Good('water', 'basic necessity for many living beings. The most wanted good in space.', 200, null),
  new Good('food', 'basic necessity for many living beings.', 200, null),
  new Good('weapons', 'sometimes law is not able to help you, atleast not that quickly as needed, or maybe you are in the other side of law anyways. In many cases weapons might be handy.', 500, null),
  new Good('industrial products', 'Stuff like machines, computers, parts etc..', 220, null),
  new Good('slaves', 'Ok, this is not good.. but some people just cant help not to gain profit on defenseless persons.', 600, null),
  new Good('common metals', 'Stuff like iron, steel, platinum, bronze etc.', 150, null),
  new Good('rare metals', 'Rare metals like.. well, like diamonds or some radiactive stuff maybe.', 700, null),
  new Good('drugs', 'Drugs, both in medical and other purposes.', 900, null)
];
/*
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
    ], */