// API controller
"use strict";

var util = require('util');

///////////////////////// Module //////////////////////////////

var urlShortner = {
	// get url
	get: function (req, res, next) {
		res.send('http://awesome.url/for/u');
	},

  // create a new shortened url
  create: function (req, res, next) {
  	res.send({'createdUrl': 'http://awesome.url/for/u'});
  },

  // update shortened url
  update: function (req, res, next) {
    res.send({'updatedUrl': 'http://awesome.url/for/u'});
  },

  // delete shortened url
  delete : function(req, res, next) {
    res.send({'deletedUrl': 'http://awesome.url/for/u'});
  }
};

// export this module
module.exports = urlShortner;

///////////////////////// Module //////////////////////////////
