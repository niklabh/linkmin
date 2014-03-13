"use strict";
//node time
require('nodetime').profile({
    accountKey: '0ddb97e79137934714f3c2f882be1d8fe97e1c44', 
    appName: 'linkmin'
  });
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var util = require('util');
var proc = require('./bin/proc');
//var config = require('url-config');

var app = express();

// all environments
app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('1a2b3c4d5e6f'));
        var RedisStore = require('connect-redis')(express);
	app.use(express.session({
		secret: 'niklabh@git',
		store: new RedisStore(),
		key: 'nikku5185811#'
	}));
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
//app.configure('development', function () {
	app.use(express.logger('dev'));
	app.use(app.router);
  app.use(express.errorHandler());
//});

app.configure('production', function () {
  express.logger.token('istDate', function (req, res) {
    return new Date();
  });
  app.use(express.logger({
    format: ':istDate :method :url :status :res[Content-Length] :response-time ms'
  }));
  //app.use('/', require('./routes/lib/authenticate'));
  app.use(app.router); // use router provided by express
  //app.use(require('./routes/lib/error')); // defines route to handle errors for all requests
});

require('./routes')(app);

http.createServer(app)
  .on('error', function (err) {
    util.log(err);
    process.exit(1);
  })
  .listen(app.get('port'), function () {
    util.log("Url server listening on port " + app.get('port') + ' in ' + (process.env.NODE_ENV || 'development'));
  });

proc.init(app);

process.on('uncaughtException', function(err){
  util.log(err.message);
  util.log(err.stack);
});
