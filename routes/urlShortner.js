// API controller
"use strict";

var util = require('util');
var async = require('async');
var keyGen = require('./lib/urlUtils').randomString;
var redis = require('./lib/redis');
var config = require('../config');

var URLS = 'urls';
var HOST = config.host;

///////////////////////// Module //////////////////////////////
var urlShortner = {
	// get url
	get: function (req, res, next) {
		if (!req.body.key)
      return next(new Error("Missing param key"));

    var key = req.body.key;
    var response = {};

    redis.hget(URLS, key, function (err, result) {
      if (!err && result) {
        response = {
          result: 'success',
          shorturl: '' + req.protocol + req.host + '/' + key,
          longUrl: result
        };
      } else {
        response = {
          result: 'failure',
          message: 'Failed to get URL',
          reason: err ? err.message : 'Unknown problem'
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
    var key = (req.body.key || keyGen(5)) + '';

    // TODO: strip http(s):// from url before saving
    var url = req.body.url+'';

    var response = {};

    redis.hexists(URLS, key, function(err, exists){
      if(!err && exists) {
        response = {
          result: 'failure',
          message: 'Failed to create shortened URL',
          reason: 'Url already Exist'
        };
        res.json(response);
      } else {
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
              url: HOST + '/' + key,
              longUrl: url
            };
            if (!req.session.links) req.session.links = {};
            req.session.links[key] = {
              key: key,
              url: HOST + '/' + key,
              longUrl: url
            };
          }
          res.json(response);
        });
      }
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

    var key = req.body.key + '';
    
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
        };
        delete req.session.links[key];
      }
      res.json(response);
    });
  },

  saveMetrics: function (req, res, next) {
    // move forward
    next();

    var key = req.params.key;
    redis.incr(key, function (error) {
      if (error) {
        util.log("Error incrementing metrics : " + util.inspect(error));
      }
    });
  },

  fetchMetrics: function (req, res, next) {
    var links = req.session.links;

    if(!links) {
      return next();
    }

    function iteration(key, cb) {
      redis.get(key, function(error, hits){
        if (error) {
          util.log("Error fetching metrics : " + util.inspect(error));
        }
        links[key].hits = hits || "0";
        cb();
      });
    }
    async.each(Object.keys(links), iteration, function (err) {
      next();
    });
  }
};

// export this module
module.exports = urlShortner;

///////////////////////// Module //////////////////////////////
