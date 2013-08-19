var config = function(){
	var self = this;

	// This has to be uniq
	self.name = "Sonos";
	self.description = "Handling sonos speakers";

	self.images = [
	            'preloader-w8-cycle-black.gif',
	            'equalizer.svg'
            ];

	self.pages = [
		{
			name: "ListSonosSpeakers",
			header: "Sonos",
			noHeader: false,
			addAsTiles: true,
			tilesIcon: 'equalizer.svg',
			description: "Shows all sonos speakers on the network",
			route: "#/Sonos",
			viewModel: "new SonosListViewModel()",
			viewModelFiles: ["Sonos.List.ViewModel.js"],
			view: "SonosListView.jade",
			viewRoute: "/Sonos"
		}
	];

	self.apiRoutes = [
		{
			route: "/Sonos/listDevices",
			function: "listDevices",
			type: "get",
			controller: "SonosController"
		},{
			route: "/Sonos/getSonosDeviceInfo",
			function: "getSonosDeviceInfo",
			type: "post",
			controller: "SonosController"
		},{
			route: "/Sonos/play",
			function: "play",
			type: "post",
			controller: "SonosController"
		},{
			route: "/Sonos/pause",
			function: "pause",
			type: "post",
			controller: "SonosController"
		},{
			route: "/Sonos/stop",
			function: "stop",
			type: "post",
			controller: "SonosController"
		},{
			route: "/Sonos/muteOn",
			function: "muteOn",
			type: "post",
			controller: "SonosController"
		},{
			route: "/Sonos/muteOff",
			function: "muteOff",
			type: "post",
			controller: "SonosController"
		}
	]

	self.controllerFiles = [
		{
			controller: "SonosController",
			controllerFile: "Sonos.Controller"
		}
	]

	// This has to be uniq
	// Expects that controller is an .js file 
	self.expressRouteFile = "Sonos.ExpressRoutes";
	self.sammyRouteFile = "Sonos.Routes.js";
	
}

exports.config = config;