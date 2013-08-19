/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Map", function(req, res){
		res.render("MapView.jade", { title: "Map", subTitle: "Map ower a room and it's units", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
		})
	// Api routes
}
