var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');

var x_save = 0;
var y_save = 0;
var x = 0;
var y = 0;
//Where to place the lamp icon on canvas, read from db later on..
var imgx = 550;
var imgy = 100;

var img = new Image();
var img2 = new Image();
var img2_h = 0;
var img2_w = 0;

img.onload = function() {
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(img2, imgx, imgy);
}
img2.onload = function() {
	img2_h = this.width;
	img2_w = this.height;
}
    img.src = 'images/plan1.jpg';
    img2.src = 'images/pin.png';


canvas1.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
  var x = event.x;
  var y = event.y;

  var canvas = document.getElementById("canvas1");

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx.drawImage(img, 0, 0);
  // needs -150 subtracted on y axis , 0 seems to start outside the canvas..
  ctx.drawImage(img2, x-(img2_w/2), (y-(img2_h/2)-150));
  savePos(x-(img2_w/2), (y-(img2_h/2)-150));
}
function savePos(x, y) {
  if (x === undefined && y === undefined) {
      if (x_save == 0 && y_save == 0) {
        console.log('no change');
      }
      else {
        //Save not implemented yet.
        console.log('saving ' + x_save + " : " + y_save + ' "not implemented yet"');
      }
  }
  
  else {
    x_save = x;
    y_save = y;
    console.log(x_save + " " + y_save);
  }
}
