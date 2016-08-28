"use strict";

var util = require('util');

module.exports = function error(err, req, res, next) {
  res.status(err.code || 400);
  var response = {
    code : err.code || 400,
    message : err.message || "Unknown Error",
  };
  util.log(err.message);
  util.log(err.stack);

  res.send(response);
}
