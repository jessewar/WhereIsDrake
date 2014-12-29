'use strict';

var _ = require('lodash');
var location = require('./location.model');

// Get list of things
exports.index = function(req, res) {
  location.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};