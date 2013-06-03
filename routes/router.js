var request = require('request');	// Simpler request library
var S = require('string');			// Extra string functions

function getNetworkMap(req, res){
	getNetworkDevices(function(data){
		res.json(JSON.stringify(data)); 
	})
}

// Make an html request to the router for the Network Map
function getNetworkDevices(callback){
	request.get('http://192.168.0.1/AdvancedNetworkMap.htm', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			findNetworkDevicesInBody(function(data){
				callback(data);
			},body);
		}else{
			console.log("Error;");
			console.log(error);
			callback(body);
		}
	}).auth('admin', 'pambo0409', true);
}


// Find Network Devices In html body from router
function findNetworkDevicesInBody(callback, body){
	if(S(body).contains('You are currently logged in from another device')){
		console.log("Could not log in, some other device is already logged in.");
	}else{
		// Check if there are any string containing the device info
		if(S(body).contains('var tagValueList = ')){
			// Find where in the file
			var n=body.search("var tagValueList = '");
			// Find end of string
			var end = body.indexOf("'", n+21);
			
			// Get string
			var str = body.substring(n+20,end);
			
			// Split the string and print it
			returnDevices(function(data){
				callback(data); 	
			},str.split("|"));
			/*
			if(printDevices){
				printDevices(str.split("|"));
			}*/
		}

	}
}

function returnDevices(callback, list){
	var tagTableValue = list;
	var index = Math.floor((tagTableValue.length-1)/parseInt(tagTableValue[0],10));

	var devices = [];

	var list = "Device Name\tIP Address\tMAC Address\tInterface\r";
	list = list +"----------------------------------------------------------\r";
	for(var i=0; i < parseInt(tagTableValue[0],10);i++){

		var Interface = "";
		if(tagTableValue[i*index+4] != ""){
			Interface = tagTableValue[i*index+4];
		}

		devices.push({ 
			DeviceName: tagTableValue[i*index+1],
			IpAdress: tagTableValue[i*index+2],
			MacAdress: tagTableValue[i*index+3],
			Interface: Interface
		 });
	}
	callback(devices);
}

// Prints an list splited in four element |sice of array=1|element1|element2|element3|element4|
function printDevices(list){
	var tagTableValue = list;
	var index = Math.floor((tagTableValue.length-1)/parseInt(tagTableValue[0],10));

	console.log("Device Name\tIP Address\tMAC Address\tInterface");
	console.log("----------------------------------------------------------");
	for(var i=0; i < parseInt(tagTableValue[0],10);i++){
		if(tagTableValue[i*index+4] == ""){
			console.log(tagTableValue[i*index+1]+'\t'+tagTableValue[i*index+2]+'\t'+tagTableValue[i*index+3]+'\t-');
		}else{
			console.log(tagTableValue[i*index+1]+'\t'+tagTableValue[i*index+2]+'\t'+tagTableValue[i*index+3]+'\t'+tagTableValue[i*index+4]);
		}
	}
}

exports.getNetworkDevices = getNetworkDevices;
exports.getNetworkMap = getNetworkMap;