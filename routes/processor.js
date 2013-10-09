// Order Controller ( part 1)
// funtions - create and history
"use strict";

var util = require('util');

///////////////////////// Module //////////////////////////////
// UI Controller ( part 1)
var processor = {
  // handle all requests
  index: function (req, res, next) {
    res.send("Awsome HomePage");
  },

  // url redirector
  redirector: function (req, res, next) {
    res.send("You will be redirected shortly");
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
