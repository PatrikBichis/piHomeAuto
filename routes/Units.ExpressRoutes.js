/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var UnitsController = require(path.resolve(process.cwd(), "Addins", "Units", "Controllers", "Units.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Units", function(req, res){
		res.render("UnitsListView.jade", { title: "Units", subTitle: "Shows all units and it's possible to turn them on/off", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
		})
	// Api routes
	app.get("/Units/List", UnitsController.list);
	app.post("/Units/SetUnit", UnitsController.setUnit);
}
