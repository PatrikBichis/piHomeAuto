var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "MobileUnits";
	self.description = "Turn on and off units";

	self.images = [
	            'preloader-w8-cycle-black.gif',
	            'lightbulb.svg'
            ];

	self.pages = [
		{
			name: "MobileListUnits",
			header: "Units",
			noHeader: true,
			addAsTiles: false,
			tilesIcon: 'lightbulb.svg',
			description: "Control lights",
			route: "#/MobileUnits",
			viewModel: "new MobileUnitsListViewModel()",
			viewModelFiles: ["MobileUnits.List.ViewModel.js"],
			view: "MobileUnitsListView.jade",
			viewRoute: "/MobileUnits"
		}
	];


	self.apiRoutes = [
		{
			route: "Units/List",
			function: "list",
			type: "get",
			controller: "MobileUnitsController"
		},{
			route: "/Units/SetUnit",
			function: "setUnit",
			type: "post",
			controller: "MobileUnitsController"
		},{
			route: "/Control/ListGroups",
			function: "listGroups",
			type: "get",
			controller: "MobileUnitsController"
		},{
			route: "/Control/SetGroup",
			function: "setGroup",
			type: "post",
			controller: "MobileUnitsController"
		}
	]

	self.controllerFiles = [
		{
			controller: "MobileUnitsController",
			controllerFile: "MobileUnits.Controller"
		}
	]



	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "MobileUnits.ExpressRoutes";
	self.sammyRouteFile = "MobileUnits.Routes.js";
	
}

exports.config = config;