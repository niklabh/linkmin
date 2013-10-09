// Order Controller ( part 1)
// funtions - create and history
"use strict";

var util = require('util');
var redis = require('./lib/redis');

var URLS = 'urls';

///////////////////////// Module //////////////////////////////
// UI Controller
var processor = {
  // handle all requests
  index: function (req, res, next) {
    res.send("Awesome HomePage");
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
