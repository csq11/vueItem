var express = require('express');
var router = express.Router();

var sql = require('../sql/index');
var Product = require('../sql/products');
/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.find(Product,{},{_id:0}).then((data)=>{
    res.send(data);
  })
});

module.exports = router;
