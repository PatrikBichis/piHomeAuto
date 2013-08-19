var path = require('path');
var addin = require(path.resolve(process.cwd(), "Addin.Core")).Core()

// Response with all controll groups 
exports.Tiles = function(req, res){
  console.log(addin.getTiles());
  res.json(JSON.stringify(addin.getTiles())); 
}