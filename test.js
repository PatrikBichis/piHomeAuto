var sonos = require('sonos');

var list = require('./routes/api/sonos')

list.listSonosDevices();
// sonos.search - searches for Sonos devices on network
/*
sonos.search(function(device) {
  console.log(device);

  for (var i = 0; i < device.length; i++) {
  	console.log(device[i]);
  	device[i].currentTrack(function(err, track){
  		if(err != null){
  			console.log(err);
  		}else{
  			console.log(track);
  		}
  		
  	});
  };
  // device is an instance of sonos.Sonos
  //device.currentTrack(console.log);
});
*/
/*
// var s = new sonos.Sonos(host, [port]);
var s = new sonos.Sonos('192.168.0.21', 1400);
s.currentTrack(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});
s.getZoneInfo(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});
s.getZoneAttrs(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});
s.getVolume(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});

s.stop(function(err, stopped){

});

s = new sonos.Sonos('192.168.0.19', 1400);
s.currentTrack(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});
s.getZoneInfo(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});
s.getZoneAttrs(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});
s.getVolume(function(err, track){
	if(err != null){
		console.log(err);
	}else{
		console.log(track);
	}
	
});
//s.currentTrack(console.log);

*/