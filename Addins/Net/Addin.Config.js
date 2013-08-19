var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Net";
	self.description = "Show units on the network";

	self.images = [
<<<<<<< HEAD
	            'preloader-w8-cycle-black.gif',
	            'rss_alt.svg'
=======
	            'preloader-w8-cycle-black.gif'
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
            ];

	self.pages = [
		{
			name: "ListNetworkUnits",
			header: "Network",
			noHeader: false,
<<<<<<< HEAD
			addAsTiles: true,
			tilesIcon: 'rss_alt.svg',
			description: "Shows all units on the network",
			route: "#/Net",
			viewModel: "new NetListViewModel()",
			viewModelFiles: ["Net.List.ViewModel.js"],
=======
			description: "Shows all units on the network",
			route: "#/Net",
			viewModel: "new NetListViewModel()",
			viewModelFile: "Net.List.ViewModel.js",
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
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