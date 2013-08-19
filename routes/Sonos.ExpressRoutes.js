/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var SonosController = require(path.resolve(process.cwd(), "Addins", "Sonos", "Controllers", "Sonos.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Sonos", function(req, res){
		res.render("SonosListView.jade", { title: "Sonos", subTitle: "Shows all sonos speakers on the network", viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
		})
	// Api routes
	app.get("/Sonos/listDevices", SonosController.listDevices);
	app.post("/Sonos/getSonosDeviceInfo", SonosController.getSonosDeviceInfo);
	app.post("/Sonos/play", SonosController.play);
	app.post("/Sonos/pause", SonosController.pause);
	app.post("/Sonos/stop", SonosController.stop);
	app.post("/Sonos/muteOn", SonosController.muteOn);
	app.post("/Sonos/muteOff", SonosController.muteOff);
}
