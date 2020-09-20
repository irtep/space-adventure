import { systems } from '../data/systemsAndPlanets.js';
import { checkRoute } from './helpFunctions.js';

export function moveShip(ship, player, motorPower) {
  // check where is destination
  const systemIn = systems.filter( sys => sys.name === player.systemLocation);
  const systemFound = systemIn[0];
  const voyageTarget = systemFound.locations.filter( syst => syst.name === ship.aiDetails.patrolRoute[ship.nextPoint]);
  // check if ship wants to change destination (later maybe, not sure if this will be done here of in mainCanvas)
  // check next step for destination
  // pretty blunt system to go depending by speed.. but after work a bit tired to think more sofisticated.. maybe later :)
  const next = checkRoute(ship.aiDetails.located, voyageTarget[0].coords);
  const next2 = checkRoute(next, voyageTarget[0].coords);
  const next3 = checkRoute(next2, voyageTarget[0].coords);
  const next4 = checkRoute(next3, voyageTarget[0].coords);
  const next5 = checkRoute(next4, voyageTarget[0].coords);
  const places = [
    next, next2, next3, next4, next5
  ];
  // need to add somekind of check too that it wouldnt pass.. or atleast check if it even can pass...
  // return it
  return {now: ship.aiDetails.located, next: places[motorPower - 1], target: voyageTarget[0].coords}
}