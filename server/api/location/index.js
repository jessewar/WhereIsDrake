'use strict';

var express = require('express');
var controller = require('./location.controller');

var router = express.Router();

router.get('/', controller.index);  // '/' refers to 'api/things/' here
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;