import { freezeCopy } from '../helpFunctions.js';

function clearCanvas(canvas, ctx){
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
}

export function draw(battleObject) {
  const canvas = document.getElementById('space');
  const ctx = canvas.getContext("2d");
  //console.log('bo ', battleObject)
  // clear canvas
  clearCanvas(canvas, ctx);
  
  // draw ships:
  battleObject.ships.forEach( ship => {
    
    // paint hull of the ship:
    ctx.beginPath();
    ctx.fillStyle = ship.color1; 
    ctx.save(); // save coords system
    ctx.translate(ship.leftTopCorner.x, ship.leftTopCorner.y);
    //ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.heading * Math.PI / 180);
    ctx.rect(0, 0, ship.w, ship.h);
    ctx.fill();
    ctx.closePath();
    
    // info texts
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillText (ship.name, 0, -30);
    ctx.fill();  
    ctx.fillStyle = 'yellow';
    ctx.fillText ('hp: '+ ship.hitPoints, 0, -20);
    ctx.fill();
    ctx.fillStyle = 'cyan';
    ctx.fillText ('sp: ' + ship.shieldPoints, 0, -10);
    ctx.fill();
    ctx.fillStyle = 'orange';
    ctx.fillText ('ep: ' + ship.energy, 40, -20);
    ctx.fill();
    ctx.fillStyle = ship.portStatus;
    ctx.fillText ('port', 40, -10);
    ctx.fill();
    ctx.fillStyle = ship.frontStatus;
    ctx.fillText ('front', 60, -10);
    ctx.fill();
    ctx.fillStyle = ship.starStatus;
    ctx.fillText ('star', 85, -10);
    ctx.fill();
    
    // other parts then and restore coords.
    
    ctx.restore();
    
      // lines from corners to canvas corners:
      // this is used to see where corners of ship are in collision test purpose
      // disabled if game is online.
    /*
      const specialArray = [ship.leftBottomCorner, ship.leftTopCorner, ship.rightBottomCorner, ship.rightTopCorner];
      const specialArray2 = [{x: 0, y: canvas.height},{x: 0, y: 0},{x: canvas.width, y: canvas.height},{x: canvas.width, y: 0}];
      let indicator = 0;
      const drawLines = specialArray.map( (lines) => {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(lines.x, lines.y);
        ctx.lineTo(specialArray2[indicator].x, specialArray2[indicator].y);
        ctx.stroke();
        indicator++;
      });
      */
    
  });
  
  // draw bullets:
  battleObject.bullets.forEach( bullet => {
    if (bullet.live) {
      
      ctx.beginPath();
      ctx.fillStyle = bullet.color;
      ctx.rect(bullet.x, bullet.y, 3, 3); // x and y are not there where i want...
      //console.log('gunxy', freezeCopy(bullet.x), freezeCopy(bullet.y));
      ctx.fill();
      ctx.closePath();   
    }
  });
  
  /*
    only to test gun locations:
  */
  /*
  battleObject.guns.forEach( gun => {
  
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.arc(gun.x, gun.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  });  
  */
}

/*
triangle:
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
*/