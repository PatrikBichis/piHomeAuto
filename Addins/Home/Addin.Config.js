var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Home";
	self.description = "Shows tiles for application";

	self.images = [
	            'home.svg',
	            'share.svg',
	            'lightbulb.svg',
	            'rss_alt.svg',
	            'camera.svg',
	            'equalizer.svg'
            ];

	self.pages = [
		{
			name: "Home",
			header: "",
			noHeader: true,
			description: "",
			route: "#/",
			viewModel: "",
			viewModelFile: "Home.ViewModel.js",
			view: "HomeView.jade",
			viewRoute: "/Home"
		}
	];


	self.apiRoutes = [
	]

	self.controllerFiles = [
	]

	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Home.ExpressRoutes";
	self.sammyRouteFile = "Home.Routes.js";
	
}

exports.config = config;