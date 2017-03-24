var express = require('express');
var asyncify = require('express-asyncify');
var router = asyncify(express.Router());

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
