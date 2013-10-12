/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var ConfigController = require(path.resolve(process.cwd(), "Addins", "Config", "Controllers", "Config.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Config", function(req, res){
		res.render("ConfigView.jade", { title: "Configuration", subTitle: "Configure stuff", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
		})
	// Api routes
	app.get("/Units/List", ConfigController.list);
}
