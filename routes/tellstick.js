
/*
 * GET home page.
 */
 var units = [ 
 		{ device : "F"+unescape("%F6")+"nsterlampa i kontoret", unitAdress : "1", currentValue : true }, 
 		{ device : "Trapstegsljus", unitAdress : "2", currentValue : false }, 
 		{ device : "F"+unescape("%F6")+"nsterlampor i vardagsrummet", unitAdress : "3", currentValue : false }, 
 		{ device : "Lampor p"+unescape("%E5")+" inneg"+unescape("%E5")+"rd", unitAdress : "4", currentValue : false }, 
 		{ device : "F"+unescape("%F6")+"nsterlampa i k"+unescape("%F6")+"ket", unitAdress : "5", currentValue : false }, 
 		{ device : "Bordslampa i hallen", unitAdress : "6", currentValue : false }, 
 		{ device : "F"+unescape("%F6")+"nsterlampa i sovrum", unitAdress : "7", currentValue : false }, 
 	]; 

exports.list = function(req, res){
  res.json(units);
};

exports.setDevice = function(req, res){
  res.json(units);
};