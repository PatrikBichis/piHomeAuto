var tdtool = require('tdtool-js').tdtool();

// Get configuration files for this piHomeAuto server
var units = require('piHomeAutoConfig').piHomeAutoConfig().tellstickConfig.units;

// Response with all tellstick devices 
exports.list = function(req, res){
  tdtool.readTellstickList(function(data){
    res.json(JSON.stringify(data)); 
  }, units);
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
    tdtool.setTellstickUnitValue(function(){
      // Response with the new state of the devices
      tdtool.readTellstickList(function(data){
        res.json(JSON.stringify(data));
      }, units);
    }, data.id, data.newValue, units);
  }
};