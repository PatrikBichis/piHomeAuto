var sys = require('sys');
var exec = require('child_process').exec;
var child;

var subnet = '13.37.1.0/24';
//Correct output, needs to be json formatted and distingisued by ip AND name if possible.
//Atm shows name if possible but then skips ip
var findActiveHosts = function(callback) {
	data = [];
	var str = "nmap --system-dns -sn " + subnet + " | grep " + subnet.slice(0, - 4)
	child = exec(str, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
	    }
		else {
			var devices = stdout.split("\n");
			for (x in devices) {
				devices[x] = devices[x].substring(21);
				if(devices[x].indexOf('(') === -1) {
					devices[x] = 'unknown ' + devices[x];
				}
				devices[x] = devices[x].replace("(", "");
				devices[x] = devices[x].replace(")", "");
				var tmpSplit = devices[x].split(" ");
				var tmpJson = {
						"name":	tmpSplit[0],
						"ip": tmpSplit[1]
				}
				devices[x] = tmpJson;
			}
			devices.pop(); //remove last element, its an empty row.
			//console.log(devices);
			callback(devices);
		}
	});
}

exports.list = function(req, res) {
	findActiveHosts(function(data){
	    res.json(JSON.stringify(data)); 
	});
}