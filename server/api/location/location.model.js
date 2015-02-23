'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationScheme = new Schema({
  lat: Number,
  lng: Number,
  info: String,
  city: String
});

module.exports = mongoose.model('Location', LocationScheme);