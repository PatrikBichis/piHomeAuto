/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var MobileUnitsController = require(path.resolve(process.cwd(), "Addins", "MobileUnits", "Controllers", "MobileUnits.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/MobileUnits", function(req, res){
		res.render("MobileUnitsListView.jade", { title: "Units", subTitle: "Control lights", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: true});
		})
	// Api routes
	app.get("/Units/List", MobileUnitsController.list);
	app.post("/Units/SetUnit", MobileUnitsController.setUnit);
	app.get("/Control/ListGroups", MobileUnitsController.listGroups);
	app.post("/Control/SetGroup", MobileUnitsController.setGroup);
}
