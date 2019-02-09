var express = require('express');
var router = express.Router();
const path = require('path');
const dirname = __dirname.replace('\\routes', '')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('client')
    res.sendFile(path.join(dirname, 'aclient', 'index.html'));

});

module.exports = router;
