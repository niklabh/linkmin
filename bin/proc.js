"use strict";

var fs = require('fs');
var util = require('util');
var argv = require('optimist').argv;
var os = require('os');

var app;
var shutdownInProgress = false;

/**
 * Close the standard output and error descriptors
 * and redirect them to the specified files provided
 * in the argument
 */

function reload(args) {
  if (args !== undefined) {
    if (args.l !== undefined) {
      fs.closeSync(1);
      fs.openSync(args.l, 'a+');
    }

    if (args.e !== undefined) {
      fs.closeSync(2);
      fs.openSync(args.e, 'a+');
    }
  }
}


/*
 * QZ: Much of this is not useful anylonger, as we have moved
 * this functionality into the cluster wrapper. I plan to remove
 * this eventually.
 */

function gracefulShutdown(err) {

  // Self awareness
  if (shutdownInProgress) {
    return;
  }

  shutdownInProgress = true;
  try {

    util.log('Initiating graceful shutdown');
    // TODO: cleanup whatever needs to be - like DB connections
    setTimeout(function () {
      process.exit(1);
    }, 1000);
  } catch (e) {
    util.error('shutting down after exception ' + e);
    process.exit(1);
  }
}

/**
 * Reopen logfiles on SIGHUP
 * Exit on uncaught exceptions
 */

function setupHandlers() {

  function terminate(err) {
    util.log("Uncaught Error: " + err.message);
    console.log(err.stack);
    if (proc.shutdownHook) {
      proc.shutdownHook(err, gracefulShutdown);
    }
  }

  process.on('uncaughtException', terminate);

  process.addListener('SIGINT', gracefulShutdown);

  process.addListener("SIGHUP", function () {
    util.log("RECIEVED SIGHUP signal, reloading log files...");
    reload(argv);
  });

}

/**
 * su/sudo/start-stop-daemon work too badly with upstart
 * and setuid is only available in > 1.4, hence this
 */

function setupUGID(uid, gid) {
  if (uid) {
    if (!gid) {
      gid = uid;
    }
    try {
      process.setgid(gid);
      util.log("changed gid to " + gid);
      process.setuid(uid);
      util.log("changed uid to " + uid);
    } catch (e) {
      util.log("Failed to set uid/gid to (" + uid + "," + gid + ") Error: " + e);
    }
  }
}

var proc = {

  init: function (a, options) {
    app = a;

    /* custom handlers */
    if (options) {
      this.shutdownHook = options.shutdown;
      this.logrotateHook = options.logrotate;
    }

    setupUGID(argv.u);
    reload(argv);
    setupHandlers();
    fs.unlink('public/system/maintenance.html', function (err, res) {
      // do nothing - the callback is merely to prevent the error from
      // being thrown
    });
  }
};

module.exports = proc;

/* ----------------- Test Code ----------------- */
if (require.main === module) {
  (function () {
    gracefulShutdown();
  })();
}

