/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var NetController = require(path.resolve(process.cwd(), "Addins", "Net", "Controllers", "Net.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Net", function(req, res){
		res.render("NetListView.jade", { title: "Network", subTitle: "Shows all units on the network", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
		})
	// Api routes
	app.get("/Net/List", NetController.list);
	app.get("/Net/LastList", NetController.lastList);
}
