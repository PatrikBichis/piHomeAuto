var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
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

  // needs -150 subtracted on y axis , 0 seems to start outside the canvas..
  console.log('you clicked at: ' + x + ' : ' + (y-150));
  if (x >= imgx && x <= imgx+img2_w) {
  	if ((y-150) >= imgy && (y-150) <= imgy+img2_h) {
  		console.log('lamp clicked!');
  		//lampFunc();
  	}
  }
}
function lampFunc() {
	location.href = '/';
}