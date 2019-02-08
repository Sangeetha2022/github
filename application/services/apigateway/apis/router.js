var express = require('express');
var router = express.Router()
var apis = require('./apis')

router.use(apis);

module.exports = router