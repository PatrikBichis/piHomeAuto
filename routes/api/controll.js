var tdtool = require('tdtool-js').tdtool();

// Get configuration files for this piHomeAuto server
var units = require('piHomeAutoConfig').piHomeAutoConfig().tellstickConfig.units;
var controll = require('piHomeAutoConfig').piHomeAutoConfig().controll;

// Response with all controll groups 
exports.listGroups = function(req, res){
  res.json(JSON.stringify(controll.groups)); 
}

// Set an group of units to a new value
// 
exports.setGroup = function(req, res){
  // Check that request was a JSON req.
  if(req.is('application/json')){

    // the bodyParser has allready parsed the JSON string
    // in the req.body
    var data = req.body;

    console.log(data);

    // Set the device to the new value
    tdtool.setTellstickUnitGroupValue(function(){
      res.json(JSON.stringify(true));
    }, data.units, data.value);
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