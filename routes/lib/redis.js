"use strict";

var util = require('util');
var redis = require('redis');
var config = require('./config').redis;

function RedisClient() {
  if (config && config.host && config.port)
    return redis.createClient(config.port, config.host);
  return redis.createClient();
}

var RedisClient = new RedisClient();

RedisClient.on('error', function (err) {
  util.log('REDIS: Error ' + err);
});

var t = setTimeout(function () {
  util.log('REDIS: Failed to connect');
  throw new Error('REDIS: Connection Failure');
}, 5000);

RedisClient.on('ready', function () {
  clearTimeout(t);
  //util.log('REDIS is now connected');
});

module.exports = RedisClient;
