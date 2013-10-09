// API controller
"use strict";

var util = require('util');
var keyGen = require('./lib/urlUtils').randomString;
var redis = require('./lib/redis');

var URLS = 'urls'; 
///////////////////////// Module //////////////////////////////
var urlShortner = {
	// get url
	get: function (req, res, next) {
		if (!req.param.key)
      return next(new Error("Missing param key"));

    var key = req.params.key;
    var response = {};

    redis.hget(URLS, key, function (error, result) {
        if (!error && result) {
          response = {
            result: 'failure',
            message: 'Failed to get URL',
            reason: err.message || 'Unknown problem'
          };
        } else {
          response = {
            result: 'success',
            shorturl: '' + req.protocol + req.host + '/' + key,
            longUrl: result
          };
        }
        res.json(response);
      });
	},

  // create a new shortened url
  create: function (req, res, next) {
    // generate a new shortened url
    if (!req.body.url)
      return next(new Error("Missing param url"));
    // TODO: strip /-* etc like dangerous chars from key
    var key = req.body.key || keyGen(5);

    // TODO: strip http(s):// from url before saving
    var url = req.body.url+'';

    var response = {};
    
    redis.hset(URLS, key, url, function(err){
      if (err) {
        util.log(err.message);
        response = {
          result: 'failure',
          message: 'Failed to create shortened URL',
          reason: err.message || 'Unknown problem'
        };
      } else {
        response = {
          result: 'success',
          message: 'Created shortened Url',
          url: '' + req.protocol + req.host + '/' + key,
          longUrl: url
        }
      }
      res.json(response);
    });
  },

  // update shortened url
  update: function (req, res, next) {
    //TODO update
    res.send({'updatedUrl': 'http://awesome.url/for/u'});
  },

  // delete shortened url
  delete : function(req, res, next) {
    // delete shortened url
    if (!req.body.key)
      return next(new Error("Missing param key"));

    var response = {};
    
    redis.hdel(URLS, key, function(err){
      if (err) {
        util.log(err.message);
        response = {
          result: 'failure',
          message: 'Failed to delete shortened URL',
          reason: err.message || 'Unknown problem'
        };
      } else {
        response = {
          result: 'success',
          message: 'Deleted shortened Url',
          url: '' + req.protocol + req.host + '/' + key,
        }
      }
      res.json(response);
    });
  }
};

// export this module
module.exports = urlShortner;

///////////////////////// Module //////////////////////////////
