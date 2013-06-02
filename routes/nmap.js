var sys = require('sys');
var exec = require('child_process').exec;
var child;

var subnet = '13.37.1.0/24';

// Correct output, needs to be json formatted and distingisued by ip AND name if possible.
// Atm shows name if possible but then skips ip
var findActiveHosts = function(callback) {
	var str = "nmap -sP " + subnet + " | grep " + subnet.slice(0, - 4) + " | sed 's/unknown//;s/(//;s/)//' | awk '{print $5}'";	    
	child = exec(str, function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
	    }
		else {
			console.log(stdout);
			callback(stdout);
		}
	});
}

exports.list = function(req, res) {
	findActiveHosts(function(data){
	    res.json(JSON.stringify(data)); 
	});
}