var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Home";
	self.description = "Shows tiles for application";

	self.images = [
<<<<<<< HEAD
	            'camera.svg'
=======
	            'home.svg',
	            'share.svg',
	            'lightbulb.svg',
	            'rss_alt.svg',
	            'camera.svg',
	            'equalizer.svg'
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
            ];

	self.pages = [
		{
			name: "Home",
			header: "",
			noHeader: true,
<<<<<<< HEAD
			addAsTiles: false,
			tilesIcon: '',
			description: "",
			route: "#/",
			viewModel: "new HomeViewModel()",
			viewModelFiles: ["Home.ViewModel.js"],
=======
			description: "",
			route: "#/",
			viewModel: "",
			viewModelFile: "Home.ViewModel.js",
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
			view: "HomeView.jade",
			viewRoute: "/Home"
		}
	];


	self.apiRoutes = [
<<<<<<< HEAD
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
=======
	]

	self.controllerFiles = [
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
	]

	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Home.ExpressRoutes";
	self.sammyRouteFile = "Home.Routes.js";
	
}

exports.config = config;