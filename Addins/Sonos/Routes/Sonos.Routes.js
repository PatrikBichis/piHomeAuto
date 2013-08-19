var control = require("../Controllers/Sonos.Controller");

exports.initAddin = function(app){
	var app = app;

	app.get('/Sonos', function(req, res){
	  res.render('SonosListView', { title: 'ListSonosSpeakers', subTitle: 'Shows all sonos speakers on the network' });
	})

	app.post('/Sonos/getSonosDeviceInfo', control.getSonosDeviceInfo);
	app.get('/Sonos/listDevices', control.listDevices);
	app.post('/Sonos/play', control.play);
	app.post('/Sonos/pause', control.pause);
	app.post('/Sonos/stop', control.stop);
	app.post('/Sonos/muteOn', control.muteOn);
	app.post('/Sonos/muteOff', control.muteOff);
}