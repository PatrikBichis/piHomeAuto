
 // Current device setup befor implementation of SQLite database
 var units = [ 
 		{ device : "F"+unescape("%F6")+"nsterlampa i kontoret", unitAdress : 1, currentValue : false }, 
 		{ device : "Trapstegsljus", unitAdress : 2, currentValue : false }, 
 		{ device : "F"+unescape("%F6")+"nsterlampor i vardagsrummet", unitAdress : 3, currentValue : false }, 
 		{ device : "Lampor p"+unescape("%E5")+" inneg"+unescape("%E5")+"rd", unitAdress : 4, currentValue : false }, 
 		{ device : "F"+unescape("%F6")+"nsterlampa i k"+unescape("%F6")+"ket", unitAdress : 5, currentValue : false }, 
 		{ device : "Bordslampa i hallen", unitAdress : 6, currentValue : false }, 
 		{ device : "F"+unescape("%F6")+"nsterlampa i sovrum", unitAdress : 7, currentValue : false }, 
 	]; 

var readTellstickList = function(callback){
    // Not yet implemented
	// Read data from the tdtool -l command and format it as the unit data object
	callback(units);
}

var setTellstickUnitValue = function(callback, unit, value){
	// Not yet implemented
	// Set device state with the tdtool --on 'unit' command

	units[unit-1].currentValue = value;

	callback();
}

// Response with all tellstick devices 
exports.list = function(req, res){
  readTellstickList(function(data){
  	res.json(JSON.stringify(data)); });
}

// Set an tellstick device to new value and 
// response with the new state of the devices
exports.setDevice = function(req, res){
  // Check that request was a JSON req.
  if(req.is('application/json')){

  	// the bodyParser has allready parsed the JSON string
  	// in the req.body
    var data = req.body;

    // Set the device to the new value
    setTellstickUnitValue(function(){
      // Response with the new state of the devices
  	  readTellstickList(function(data){
	    res.json(JSON.stringify(data));
	  });
    }, data.unitAdress, data.newValue);
  }
};