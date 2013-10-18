var control = require('piHomeAutoControl').control();
var mongoose = require('mongoose');
var units = mongoose.model('Unit');
var groups = mongoose.model('Group');


// Response with all tellstick devices 
exports.listUnits = function(req, res){
	units.find({}, null, {sort:{_id: 1}},function (err, data) {
		if (err) throw err;
		res.json(JSON.stringify(data)); 
	});
}

exports.listGroups = function(req, res){
  groups.find({}, null, {sort:{_id: 1}},function (err, data) {
    if (err) throw err;
    res.json(JSON.stringify(data)); 
  });
}


exports.deleteUnit = function(req, res){

	// Check that request was a JSON req.
  	if(req.is('application/json')){

    // the bodyParser has allready parsed the JSON string
    // in the req.body
    var data = req.body;
    units.find(data, function (err, data) {
		if (err) throw err;
	}).remove();
    
    res.json(JSON.stringify(true));
  }
}

exports.addUnit = function(req, res){
	if(req.is('application/json')){
    var toInsert = req.body;
    units.findById(toInsert._id, function (err, data) {
      if (data === undefined || data === null) {
        res.json(JSON.stringify(true));
        console.log('nothing found, go ahead and create');
        units.create(toInsert, function (err, data) {
          if (err) throw err;
        });
      }
      else {
        res.json(JSON.stringify(false));
        console.log('allready exists!');
      }
    });
  }
}

exports.deleteGroup = function(req, res){

  // Check that request was a JSON req.
    if(req.is('application/json')){

    // the bodyParser has allready parsed the JSON string
    // in the req.body
    var data = req.body;
    groups.find(data, function (err, data) {
    if (err) throw err;
  }).remove();
    
    res.json(JSON.stringify(true));
  }
}

exports.addGroup = function(req, res){

  // Check that request was a JSON req.
    if(req.is('application/json')){
      var toInsert = req.body;
        groups.findById(toInsert._id, function (err, data) {
          if (data === undefined || data === null) {
            res.json(JSON.stringify(true));
            console.log('nothing found, go ahead and create');
            groups.create(toInsert, function (err, data) {
              if (err) throw err;
            });
          }
          else {
            res.json(JSON.stringify(false));
            console.log('allready exists!');
          }
        });
  }    
};