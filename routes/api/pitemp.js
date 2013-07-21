var pitemp = require('pitemp-js').pitemp();

pitemp.curtemp(function(data){
	console.log('Pi temperature is: ' + data[0].value);
});

exports.loadTemps = function(req, res) {
	pitemp.curtemp(function(data){
	    res.json(JSON.stringify(data)); 
	});
}