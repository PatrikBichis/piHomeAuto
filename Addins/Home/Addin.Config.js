var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Home";
	self.description = "Shows tiles for application";

	self.images = [
	            'camera.svg'
            ];

	self.pages = [
		{
			name: "Home",
			header: "",
			noHeader: true,
			addAsTiles: false,
			tilesIcon: '',
			description: "",
			route: "#/",
			viewModel: "new HomeViewModel()",
			viewModelFiles: ["Home.ViewModel.js"],
			view: "HomeView.jade",
			viewRoute: "/Home"
		}
	];


	self.apiRoutes = [
		{
			route: "/Tiles",
			function: "Tiles",
			type: "get",
			controller: "HomeTilesController"
		}
	]

	self.controllerFiles = [
		{
			controller: "HomeTilesController",
			controllerFile: "Home.Tiles.Controller"
		}
	]

	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Home.ExpressRoutes";
	self.sammyRouteFile = "Home.Routes.js";
	
}

exports.config = config;