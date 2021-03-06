/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/twitter', require('./api/twitter'));
  app.use('/api/location', require('./api/location'));
  app.use('/api/songkick', require('./api/songkick'));

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.get('/', function(req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });

  app.get('/map', function(req, res) {
    res.sendfile(app.get('appPath') + '/index.html');
  });
};
