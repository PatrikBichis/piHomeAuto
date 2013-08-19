var control = require('piHomeAutoControl').control();

// Response with all tellstick devices 
exports.list = function(req, res){
  res.json(JSON.stringify(control.units)); 
}

// Set an control device to new value and 
// response with the new state of the devices
exports.setUnit = function(req, res){
  // Check that request was a JSON req.
  if(req.is('application/json')){

    // the bodyParser has allready parsed the JSON string
    // in the req.body
    var data = req.body;
    console.log(data);

    if(data != "undefined"){
      control.setUnit(function(){
        // Response with the new state of the devices
        res.json(JSON.stringify(control.units));
      }, data);
    }
  }
};
