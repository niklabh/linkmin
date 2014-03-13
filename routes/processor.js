// Order Controller ( part 1)
// funtions - create and history
"use strict";

var util = require('util');
var redis = require('./lib/redis');
var keyGen = require('./lib/urlUtils').randomString;
var extend = require('./lib/urlUtils').extend;
var config = require('../config');

var URLS = 'urls';
var KEYS = 'keys';
var HOST = config.host;

///////////////////////// Module //////////////////////////////
// UI Controller
var processor = {
  // Restore session
  restoreSession: function (req, res, next) {
    var key = req.body.key;
    if (key) {
      redis.hget(KEYS, key, function (error, result) {
        if (!error && result) {
          try {
            req.session.key = key;
            result = JSON.parse(result);
            req.session.links = extend({}, req.session.links || {}, result);  
          } catch (e) {
            redis.hdel(KEYS, key);
            req.session.key = null;
            util.log("parse error for session: " + util.inspect(e));
          }
        }
        next();
      });
    } else {
      next();
    }
  },

  saveSession: function (req, res, next) {
    // move forward
    var key = req.session.key = req.session.key || keyGen(8);
    var data;

    next();
    
    if (req.session.links && Object.keys(req.session.links).length) {
      data = JSON.stringify(req.session.links);
      redis.hset(KEYS, key, data, function (error) {
        if (error) {
          util.log("Error saving data :" + util.inspect(error));
        }
      });
    }
  },

  // handle all requests
  index: function (req, res, next) {
    var locals = {
      title: 'linkMin',
      host: HOST,
      key: req.session.key,
      links: req.session.links || []
    };
    res.render('index', locals);
  },

  // url redirector
  redirector: function (req, res, next) {
    var key = req.params.key + '';

    redis.hget(URLS, key, function (error, result) {
      if (!error && result) {
        res.redirect(result);
      } else {
        res.send(404, "Oops! You have found a dead link!!");
      }
    });
  },

  // error handler to reverse cart checkout
  error: function(err, req, res, next) {
    if(!err) {
      return next();
    }
    res.status(err.code || 400);
    var response = {
      code : err.code || 400,
      message : err.message || "Unknown Error",
    };
    util.log(err.message);
    util.log(err.stack);

    res.send(response);
  }
};

// export this module
module.exports = processor;


///////////////////////// Module //////////////////////////////
