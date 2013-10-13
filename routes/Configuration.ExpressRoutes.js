/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var ConfigurationController = require(path.resolve(process.cwd(), "Addins", "Configuration", "Controllers", "Configuration.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Configuration", function(req, res){
		res.render("ConfigurationView.jade", { title: "Config", subTitle: "Configure stuff", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
		})
	// Api routes
	app.get("/Configuration/listUnits", ConfigurationController.listUnits);
	app.post("/Configuration/addUnit", ConfigurationController.addUnit);
	app.post("/Configuration/deleteUnit", ConfigurationController.deleteUnit);
	app.get("/Configuration/listGroups", ConfigurationController.listGroups);
	app.post("/Configuration/addGroup", ConfigurationController.addGroup);
	app.post("/Configuration/deleteGroup", ConfigurationController.deleteGroup);
}
