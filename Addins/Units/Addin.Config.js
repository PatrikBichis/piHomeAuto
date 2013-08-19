var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Units";
	self.description = "Turn on and off units";

	self.images = [
<<<<<<< HEAD
	            'preloader-w8-cycle-black.gif',
	            'lightbulb.svg'
=======
	            'preloader-w8-cycle-black.gif'
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
            ];

	self.pages = [
		{
			name: "ListUnits",
			header: "Units",
			noHeader: false,
<<<<<<< HEAD
			addAsTiles: true,
			tilesIcon: 'lightbulb.svg',
			description: "Shows all units and it's possible to turn them on/off",
			route: "#/Units",
			viewModel: "new UnitsListViewModel()",
			viewModelFiles: ["Units.List.ViewModel.js"],
=======
			description: "Shows all units and it's possible to turn them on/off",
			route: "#/Units",
			viewModel: "new UnitsListViewModel()",
			viewModelFile: "Units.List.ViewModel.js",
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
			view: "UnitsListView.jade",
			viewRoute: "/Units"
		}
	];


	self.apiRoutes = [
		{
			route: "/Units/List",
			function: "list",
			type: "get",
			controller: "UnitsController"
		},{
			route: "/Units/SetUnit",
			function: "setUnit",
			type: "post",
			controller: "UnitsController"
		}
	]

	self.controllerFiles = [
		{
			controller: "UnitsController",
			controllerFile: "Units.Controller"
		}
	]



	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Units.ExpressRoutes";
	self.sammyRouteFile = "Units.Routes.js";
	
}

exports.config = config;