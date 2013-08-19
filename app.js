/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , addin = require("./Addin.Core").Core()
<<<<<<< HEAD
=======
  , pitemp = require('./routes/api/pitemp')
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
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

<<<<<<< HEAD
=======
app.get('/map', function(req, res){
  res.render('map', { title: 'piHomeAuto', subTitle: 'Karta' });
})

app.get('/temps', function(req, res){
  res.render('temps', { title: 'piHomeAuto', subTitle: 'Temperaturer' });
})

// Added API for getting temperatures
app.get('/pitemp', pitemp.loadTemps)


>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
addin.installAddins(app, function(){
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});