'use strict';

var util = require('util');

var mw = {
  nocache: function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  }
};

module.exports = mw;
