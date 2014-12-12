'use strict'

var express = require('express');
var controller = require('./songkick.controller');

var router = express.Router();

router.get('/', controller.index);	// '/' refers to 'api/songkick' here

module.exports = router;