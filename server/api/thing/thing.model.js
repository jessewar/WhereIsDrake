'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationScheme = new Schema({
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('Location', LocationScheme);