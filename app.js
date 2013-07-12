
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , tellstick = require('./routes/api/tellstick')
  , control = require('./routes/api/control')
  , nmap = require('./routes/api/nmap')
  , sonos = require('./routes/api/sonos')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/net', function(req, res){
	res.render('net', { title: 'piHomeAuto', subTitle: 'Enheter på nätverket' });
})

app.get('/map', function(req, res){
  res.render('map', { title: 'piHomeAuto', subTitle: 'Karta' });
})

app.get('/units', function(req, res){
  res.render('units', { title: 'piHomeAuto', subTitle: 'Enheter' });
})

app.get('/groups', function(req, res){
	res.render('groups', { title: 'piHomeAuto', subTitle: 'Grupper' });
})

app.get('/sonos', function(req, res){
  res.render('sonos', { title: 'piHomeAuto', subTitle: 'Sonos enheter' });
})

// Added API for tellstick
app.get('/Tellstick/List', tellstick.list);
app.post('/Tellstick/SetDevice', tellstick.setDevice);

// Added API for groups
app.get('/Control/ListGroups', control.listGroups);
app.post('/Control/SetGroup', control.setGroup);
app.get('/Control/List', control.list);
app.post('/Control/SetDevice', control.setDevice);

// Added API for Nmap information
app.get('/Nmap/List', nmap.list)
app.get('/Nmap/LastList', nmap.lastList)

// Added API for sonos 
app.post('/Sonos/getSonosDeviceInfo', sonos.getSonosDeviceInfo);
app.get('/Sonos/listDevices', sonos.listDevices);
app.post('/Sonos/play', sonos.play);
app.post('/Sonos/pause', sonos.pause);
app.post('/Sonos/stop', sonos.stop);
app.post('/Sonos/muteOn', sonos.muteOn);
app.post('/Sonos/muteOff', sonos.muteOff);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
