var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Groups";
	self.description = "Turn on and off groups";

	self.images = [
	            'preloader-w8-cycle-black.gif',
	            'share.svg'
            ];

	self.pages = [
		{
			name: "ListGroups",
			header: "Groups",
			noHeader: false,
			addAsTiles: true,
			tilesIcon: 'share.svg',
			description: "Shows all groups and it's possible to turn them on/off",
			route: "#/Groups",
			viewModel: "new GroupsListViewModel()",
			viewModelFiles: ["Groups.List.ViewModel.js"],
			view: "GroupsListView.jade",
			viewRoute: "/Groups"
		}
	];

	self.apiRoutes = [
		{
			route: "/Control/ListGroups",
			function: "listGroups",
			type: "get",
			controller: "GroupsController"
		},{
			route: "/Control/SetGroup",
			function: "setGroup",
			type: "post",
			controller: "GroupsController"
		}
	]

	self.controllerFiles = [
		{
			controller: "GroupsController",
			controllerFile: "Groups.Controller"
		}
	]

	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Groups.ExpressRoutes";
	self.sammyRouteFile = "Groups.Routes.js";
	
}

exports.config = config;