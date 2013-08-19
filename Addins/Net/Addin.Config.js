var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Net";
	self.description = "Show units on the network";

	self.images = [
	            'preloader-w8-cycle-black.gif',
	            'rss_alt.svg'
            ];

	self.pages = [
		{
			name: "ListNetworkUnits",
			header: "Network",
			noHeader: false,
			addAsTiles: true,
			tilesIcon: 'rss_alt.svg',
			description: "Shows all units on the network",
			route: "#/Net",
			viewModel: "new NetListViewModel()",
			viewModelFiles: ["Net.List.ViewModel.js"],
			view: "NetListView.jade",
			viewRoute: "/Net"
		}
	];

	self.apiRoutes = [
		{
			route: "/Net/List",
			function: "list",
			type: "get",
			controller: "NetController"
		},{
			route: "/Net/LastList",
			function: "lastList",
			type: "get",
			controller: "NetController"
		}
	]

	self.controllerFiles = [
		{
			controller: "NetController",
			controllerFile: "Net.Controller"
		}
	]

	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Net.ExpressRoutes";
	self.sammyRouteFile = "Net.Routes.js";
	
}

exports.config = config;