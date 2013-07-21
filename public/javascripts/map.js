var can = document.getElementById('canvas1');
var ctx = can.getContext('2d');
//Where to place the lamp icon on canvas, read from db later on..
var imgx = 550;
var imgy = 100;

//Get devices, will be feteched from mongoDB or config
var devices = [
  {
    "name":"1",
    "x":550,
    "y":100
  },
  {
    "name":"2",
    "x":400,
    "y":150
  },
  {
    "name":"3",
    "x":350,
    "y":200
  }];

var editActive = false;

//Vars to locate mouse and where to save
var x_save = 0;
var y_save = 0;
var x = 0;
var y = 0;

var img = new Image();
var img2 = new Image();
var img2_h = 0;
var img2_w = 0;

init();

function init() {
//Draw the canvas
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  img.onload = function() {
      ctx.drawImage(img, 0, 0);
      for (dev in devices) {
        ctx.drawImage(img2, devices[dev].x, devices[dev].y);
      }
  }
  img2.onload = function() {
  	img2_h = this.width;
  	img2_w = this.height;
  }
      img.src = 'images/plan1.jpg';
      img2.src = 'images/pin.png';
}

canvas1.addEventListener("mousedown", getPosition, false);

function getPosition(event) {
  
  var mouse_x = event.x;
  var mouse_y = event.y;

  var canvas = document.getElementById("canvas1");

  mouse_x -= canvas.offsetLeft;
  mouse_y -= canvas.offsetTop;

  if (editActive == false) {
    // needs -150 subtracted on y axis , 0 seems to start outside the canvas..
    console.log('you clicked at: ' + mouse_x + ' : ' + (mouse_y-150));
    searchPosition(mouse_x, mouse_y);
  }
  if (editActive == true) {
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx.drawImage(img, 0, 0);
    // needs -150 subtracted on y axis , 0 seems to start outside the canvas..
    //ctx.drawImage(img2, mouse_x-(img2_w/2), (mouse_y-(img2_h/2)-150));
    //savePos(mouse_x-(img2_w/2), (mouse_y-(img2_h/2)-150));
  }
}

function searchPosition(x,y) {
  for(dev in devices) {
    if (x >= devices[dev].x && x <= devices[dev].x+img2_w) {
      if ((y-150) >= devices[dev].y && (y-150) <= devices[dev].y+img2_h) {
        console.log('lamp ' + devices[dev].name +  ' clicked!');
        lampFunc(devices[dev].name);
      }
    }
  }
}

function lampFunc(dev) {
	window.alert('You clicked lamp # ' + dev);
}

function editMode() {
  editActive = true;
  console.log('editing active');
}
function savePos(x, y) {
  if (x === undefined && y === undefined) {
      if (x_save == 0 && y_save == 0) {
        console.log('no change');
      }
      else {
        //Save not implemented yet.
        console.log('saving ' + x_save + " : " + y_save + ' "not implemented yet"');
        editActive = false;
        //init();
        //init function does not redraw the lamp icon properly.. temp fix
        window.location = "/map";
      }
  }
  
  else {
    x_save = x;
    y_save = y;
    console.log(x_save + " " + y_save);
  }
}