var tdtool = require('tdtool-js').tdtool();

// Get configuration files for this piHomeAuto server
var units = require('piHomeAutoConfig').piHomeAutoConfig().tellstickConfig.units;
var controll = require('piHomeAutoConfig').piHomeAutoConfig().controll;

// Response with all controll groups 
exports.listGroups = function(req, res){
  res.json(JSON.stringify(controll.groups)); 
}

// Set an tellstick device to new value and 
// response with the new state of the devices
// 
exports.setGroup = function(req, res){
  // Check that request was a JSON req.
  if(req.is('application/json')){

    // the bodyParser has allready parsed the JSON string
    // in the req.body
    var data = req.body;
    /*
    changeAllUnits(function(){
      // Response with the new state of the devices
      tdtool.readTellstickList(function(data){
        res.json(JSON.stringify(data));
      }, units);
    }, data.units);

     

    // Set the device to the new value
    tdtool.setTellstickUnitValue(function(){
      // Response with the new state of the devices
      tdtool.readTellstickList(function(data){
        res.json(JSON.stringify(data));
      }, units);
    }, data.id, data.newValue, units);
    */
  }
};

function changeAllUnits(callback, units){
  for (var i = 0; i < units.length; i++) {
      if(units[i].type === "tellstick"){
        tdtool.setTellstickUnitValue(function(){

        }, data.id, data.newValue, units);
      }
    };
}