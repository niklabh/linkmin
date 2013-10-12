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
  app.all('/', processor.index, processor.error);

  app.get('/:key', processor.redirector, processor.error);
  //////////////////////////// UI ////////////////////////////////


  /////////////////////////////// API /////////////////////////////////////
  app.get('/shortner/:key', mw.nocache, urlShortner.get, processor.error);

  app.post('/shortner', mw.nocache, urlShortner.create, processor.error);

  app.put('/shortner', mw.nocache, urlShortner.update, processor.error);

  app.delete('/shortner', mw.nocache, urlShortner.delete, processor.error);
  //////////////////////////////// API ////////////////////////////////////
};

//////////////////////////// Module //////////////////////////////
