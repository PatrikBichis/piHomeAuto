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
			console.log(s);
			console.log(device);
			data.name = device.CurrentZoneName;

			// Return the data with the Sonos devices
			res.json(JSON.stringify(data)); 
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
		devicesInformation.push({name: data.CurrentZoneName}); 
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


