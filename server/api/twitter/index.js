'use strict'

var express = require('express');
var controller = require('./twitter.controller');

var router = express.Router();

router.get('/twitter', controller.index);

module.exports = router;