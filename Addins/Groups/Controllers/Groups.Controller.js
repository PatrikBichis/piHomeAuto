var control = require('piHomeAutoControl').control();

// Response with all controll groups 
exports.listGroups = function(req, res){
  res.json(JSON.stringify(control.groups)); 
}

// Set an group of units to a new value
// 
exports.setGroup = function(req, res){
  // Check that request was a JSON req.
  if(req.is('application/json')){

    // the bodyParser has allready parsed the JSON string
    // in the req.body
    var data = req.body;

    // Go true all device and change there value
    control.setGroup(function(){
      res.json(JSON.stringify(true));
    }, data);
  }
};


