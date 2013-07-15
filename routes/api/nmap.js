var nmap = require('nmap-js').nmap();

var tempDevices = [];

// Find all network devices to be able to show them fast to 
// the view
nmap.findActiveHosts(function(data, net){
	console.log("All network devices has been found");
	console.log('my network is: ' + net);
    tempDevices = data; 
});

exports.lastList = function(req, res){
	res.json(JSON.stringify(tempDevices));
}

exports.list = function(req, res) {
	nmap.findActiveHosts(function(data){
		tempDevices = data; 
	    res.json(JSON.stringify(data)); 
	});
}


