
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , addin = require("./Addin.Core").Core()
  , pitemp = require('./routes/api/pitemp')
  , dawndusk = require('./routes/api/sun.js');

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

app.get('/map', function(req, res){
  res.render('map', { title: 'piHomeAuto', subTitle: 'Karta' });
})

app.get('/temps', function(req, res){
  res.render('temps', { title: 'piHomeAuto', subTitle: 'Temperaturer' });
})

// Added API for getting temperatures
app.get('/pitemp', pitemp.loadTemps)


addin.installAddins(app, function(){
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});