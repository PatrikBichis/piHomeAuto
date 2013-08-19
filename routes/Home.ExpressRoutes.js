/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

<<<<<<< HEAD
var HomeTilesController = require(path.resolve(process.cwd(), "Addins", "Home", "Controllers", "Home.Tiles.Controller"));

=======
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Home", function(req, res){
<<<<<<< HEAD
		res.render("HomeView.jade", { title: "", subTitle: "", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: true});
		})
	// Api routes
	app.get("/Tiles", HomeTilesController.Tiles);
=======
		res.render("HomeView.jade", { title: "", subTitle: "", viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: true});
		})
	// Api routes
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
}
