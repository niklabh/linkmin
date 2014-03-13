// main router module
// defines and initializes all routes
"use strict";

// include all controlers
var urlShortner = require('./urlShortner');
var processor = require('./processor');
var mw = require('./middleware');

///////////////////////// Module ///////////////////////////////

module.exports = function (app) {
  /////////////////////////// UI ////////////////////////////////
  app.all('/', processor.restoreSession, processor.saveSession, urlShortner.fetchMetrics, processor.index);

  app.get('/:key', urlShortner.saveMetrics, processor.redirector);
  //////////////////////////// UI ////////////////////////////////

  /////////////////////////////// API /////////////////////////////////////
  app.post('/shortner/*', mw.nocache);

  app.post('/shortner/fetch', urlShortner.get);

  app.post('/shortner/create', urlShortner.create);

  app.post('/shortner/update', urlShortner.update);

  app.post('/shortner/delete', urlShortner.delete);
  //////////////////////////////// API ////////////////////////////////////
};

//////////////////////////// Module //////////////////////////////
