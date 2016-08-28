"use strict";

module.exports = {
  host: 'http://www.linkm.in',  // Your host name
  redis: {
    host: process.env.REDIS_URL || '127.0.0.1', // redis server
    port: 6379 // redis port
  }
};
