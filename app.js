/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var express = require('express')
  , http = require('http')
  , path = require('path')
  , addin = require("./Addin.Core").Core()
  , dawndusk = require('./routes/api/sun.js')
  , eventEngine = require('./eventEngine.js')
  , models = require('./models');

require('express-mongoose');


mongoose.connect('mongodb://localhost/piHomeAuto', function (err) {
  if (err) throw err;

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

  addin.installAddins(app, function(){
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
      eventEngine.initEventEngine(null);
    });
  });
});