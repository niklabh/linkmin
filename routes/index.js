// main router module
// defines and initializes all routes
"use strict";

// include all controlers
var urlShortner = require('./urlShortner');
var processor = require('./processor');

///////////////////////// Module //////////////////////////////

module.exports = function (app) {
  ///////////////////////// UI //////////////////
  app.all('/', processor.index, processor.error);

  app.get('/:key', processor.redirector, processor.error);
  ///////////////////////////////////////////////


  /////////////////////////////// API //////////////////////////
  app.get('/shortner/:key', urlShortner.get, processor.error);

  app.post('/shortner', urlShortner.create, processor.error);

  app.put('/shortner', urlShortner.update, processor.error);

  app.delete('/shortner', urlShortner.delete, processor.error);
  //////////////////////////////////////////////////////////////
};

///////////////////////// Module //////////////////////////////
