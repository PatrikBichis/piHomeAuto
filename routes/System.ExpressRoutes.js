/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var SystemInfoController = require(path.resolve(process.cwd(), "Addins", "System", "Controllers", "System.Info.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/SystemInfo", function(req, res){
		res.render("SystemInfoView.jade", { title: "System infromation", subTitle: "Shows information about the system", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
		})
	// Api routes
	app.get("/pitemp", SystemInfoController.loadTemps);
}
