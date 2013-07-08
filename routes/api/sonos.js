var sonos = require('sonos');

// Get configuration files for this piHomeAuto server
var units = require('piHomeAutoConfig').piHomeAutoConfig().sonos.units;

// Return info about an specific device
// {host: '192.168.0.1', port: 1400}
exports.getSonosDeviceInfo = function(req, res){
	// Check that request was a JSON req.
	if(req.is('application/json')){

		// the bodyParser has allready parsed the JSON string
		// in the req.body
		var data = req.body;

		var s = new sonos.Sonos(data.host, data.port);

		s.getZoneAttrs(function(err, device){
			var data = {};
			data.name = device.CurrentZoneName;

			s.getTopology(function(err, output){
				console.log(s);
				console.log(device);
				console.log(output);
			});
			

			// Return the data with the Sonos devices
			res.json(JSON.stringify(data)); 
		});
	}else{
		res.send(404);
	}		
};

exports.play = function(req, res){
	// Check that request was a JSON req.
	if(req.is('application/json')){

		// the bodyParser has allready parsed the JSON string
		// in the req.body
		var data = req.body;

		var s = new sonos.Sonos(data.host, data.port);

		s.play(function(err, playing) {
		  console.log([err, playing]);
		  res.send(200);
		});

	}else{
		res.send(404);
	}		
};

exports.pause = function(req, res){
	// Check that request was a JSON req.
	if(req.is('application/json')){

		// the bodyParser has allready parsed the JSON string
		// in the req.body
		var data = req.body;

		var s = new sonos.Sonos(data.host, data.port);

		s.pause(function(err, paused) {
		  console.log([err, paused]);
		  res.send(200);
		});
		
	}else{
		res.send(404);
	}		
};

exports.stop = function(req, res){
	// Check that request was a JSON req.
	if(req.is('application/json')){

		// the bodyParser has allready parsed the JSON string
		// in the req.body
		var data = req.body;

		var s = new sonos.Sonos(data.host, data.port);

		s.stop(function(err, stoped) {
		  console.log([err, stoped]);
		  res.send(200);
		});
		
	}else{
		res.send(404);
	}		
};

exports.mute = function(req, res){
	// Check that request was a JSON req.
	if(req.is('application/json')){

		// the bodyParser has allready parsed the JSON string
		// in the req.body
		var data = req.body;

		var s = new sonos.Sonos(data.host, data.port);

		sonos.setMuted(function(err, muted) {
		  console.log([err, muted]);
		  res.send(200);
		});
		
	}else{
		res.send(404);
	}		
};

exports.listDevices = function(req, res){
	var data = [];
	getInfoFromDevices(function(data){
		// Return the data with the Sonos devices
		res.json(JSON.stringify(data));
	}, units, data, units.length, 0);
}

function getInfoFromDevice(callback, device, devicesInformation){
	var s = new sonos.Sonos(device.host, device.port)
	var device = device;
	var devicesInformation = devicesInformation;

	s.getZoneAttrs(function(err, data){
		devicesInformation.push({name: data.CurrentZoneName, host: device.host, type: device.type}); 
		callback(devicesInformation);
	}, devicesInformation);
}

function getInfoFromDevices(callback, devices, devicesInformation, length, i){
	var callback = callback;
	var devices = devices;
	var devicesInformation = devicesInformation;
	var length = length;

	if( i < length ) {
		getInfoFromDevice(function(){
			getInfoFromDevices(callback, devices, devicesInformation, length, i + 1 );
		}, devices[i], devicesInformation);
	}else{
		callback(devicesInformation);
	}
}


