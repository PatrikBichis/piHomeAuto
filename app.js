
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , tellstick = require('./routes/api/tellstick')
  , nmap = require('./routes/api/nmap')
  , router = require('./routes/api/router')
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
	res.render('net', { title: 'piHomeAuto' }, subTitle: 'Enheter på nätverket' });
})

app.get('/router', function(req, res){
	res.render('router', { title: 'piHomeAuto' }, subTitle: 'Enheter på nätverket' });
})

// Added API for tellstick
app.get('/Tellstick/List', tellstick.list);
app.post('/Tellstick/SetDevice', tellstick.setDevice);

// Added API for router information
app.get('/Router/getNetworkMap', router.getNetworkMap);
app.get('/Router/getNmap', nmap.list);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
