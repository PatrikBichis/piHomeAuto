var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "System";
	self.description = "System information";

	self.images = [
	            'preloader-w8-cycle-black.gif',
	            'info.svg'
            ];

	self.pages = [
		{
			name: "SystemInfo",
			header: "System infromation",
			noHeader: false,
			addAsTiles: true,
			tilesIcon: 'info.svg',
			description: "Shows information about the system",
			route: "#/SystemInfo",
			viewModel: "new SystemInfoViewModel()",
			viewModelFiles: ["System.Info.ViewModel.js"],
			view: "SystemInfoView.jade",
			viewRoute: "/SystemInfo"
		}
	];


	self.apiRoutes = [
		{
			route: "/pitemp",
			function: "loadTemps",
			type: "get",
			controller: "SystemInfoController"
		}
	]

	self.controllerFiles = [
		{
			controller: "SystemInfoController",
			controllerFile: "System.Info.Controller"
		}
	]



	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "System.ExpressRoutes";
	self.sammyRouteFile = "System.Routes.js";
	
}

exports.config = config;