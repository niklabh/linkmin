"use strict";

var config = require('./config');
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var util = require('util');
var proc = require('./bin/proc');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('1a2b3c4d5e6f'));
app.use(express.session({
	secret: 'niklabh@git',
	key: '123@#$12333'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.logger('dev'));
app.use(app.router);
app.use(express.errorHandler());


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
