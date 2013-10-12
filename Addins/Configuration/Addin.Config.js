var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Configuration";
	self.description = "Configure stuff";

	self.images = [
	            'preloader-w8-cycle-black.gif',
	            'wrench.svg'
            ];

	self.pages = [
		{
			name: "Configuration",
			header: "Config",
			noHeader: false,
			addAsTiles: true,
			tilesIcon: 'wrench.svg',
			description: "Configure stuff",
			route: "#/Configuration",
			viewModel: "new ConfigurationViewModel()",
			viewModelFiles: ["Configuration.List.ViewModel.js"],
			view: "ConfigurationView.jade",
			viewRoute: "/Configuration"
		}
	];


	self.apiRoutes = [
		{
			route: "/Configuration/listUnits",
			function: "listUnits",
			type: "get",
			controller: "ConfigurationController"
		},{
			route: "/Configuration/addUnit",
			function: "addUnit",
			type: "post",
			controller: "ConfigurationController"
		},{
			route: "/Configuration/deleteUnit",
			function: "deleteUnit",
			type: "post",
			controller: "ConfigurationController"
		}
	]

	self.controllerFiles = [
		{
			controller: "ConfigurationController",
			controllerFile: "Configuration.Controller"
		}
	]



	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Configuration.ExpressRoutes";
	self.sammyRouteFile = "Configuration.Routes.js";
	
}

exports.config = config;