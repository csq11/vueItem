var express = require('express');
var router = express.Router();
const xlsx = require('node-xlsx');
const nodeExcel = require('excel-export');
var User = require('./../sql/user'); 
var sql = require('./../sql/index'); // <==>  ./../sql
/* GET users listing. */
// jsonp 解决跨域问题
// router.get('/', function(req, res, next) {
//   var _callback = req.query.callback; // http://****/api/users?callback=
//   sql.find(User, {}, { _id: 0}).then((data) => {
//     if (_callback) {
//       res.type('text/javascript');
//       res.send(_callback + '('+ JSON.stringify(data) +')')
//     } else {
//       res.send(data)
//     }
    
//   })
// });
router.get('/', function(req, res, next) {
  sql.find(User, {}, { _id: 0}).then((data) => {
    res.send(data)
  })
});
router.get('/detail', function(req, res, next) {
  sql.find(User, req.query, { _id: 0}).then((data) => {
    res.send(data)
  })
});

module.exports = router;
