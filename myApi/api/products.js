var express = require('express');
var router = express.Router();
const xlsx = require('node-xlsx');
const nodeExcel = require('excel-export');
var User = require('./../sql/user'); 
var sql = require('./../sql/index'); // <==>  ./../sql

router.get('/', function(req, res, next) {
  sql.find(User, {}, { _id: 1}).then((data) => {
    res.send(data)
  })
});
router.get('/detail', function(req, res, next) {
  sql.find(User, req.query, { _id: 0}).then((data) => {
    res.send(data)
  })
});

module.exports = router;
