"use strict";

var util = require('util');
var redis = require('redis');

function RedisClient() {
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
  util.log('REDIS is now connected');
});

module.exports = RedisClient;
