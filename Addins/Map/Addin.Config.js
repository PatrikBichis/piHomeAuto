var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Map";
	self.description = "Map ower a room with units";

	self.images = [
	            'preloader-w8-cycle-black.gif',
	            'pin.png',
	            'plan1.jpg'
            ];

	self.pages = [
		{
			name: "Map",
			header: "Map",
			noHeader: false,
			addAsTiles: true,
			tilesIcon: 'home.svg',
			description: "Map ower a room and it's units",
			route: "#/Map",
			viewModel: "new MapViewModel()",
			viewModelFiles: ["Map.ViewModel.js", "map.js"],
			view: "MapView.jade",
			viewRoute: "/Map"
		}
	];


	self.apiRoutes = [
	
	]

	self.controllerFiles = [

	]



	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Map.ExpressRoutes";
	self.sammyRouteFile = "Map.Routes.js";
	
}

exports.config = config;