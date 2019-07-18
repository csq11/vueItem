var express = require('express');
var router = express.Router();

var sql = require('../sql/index');
var Consumer = require('../sql/consumers');
/* GET users listing. */
router.get('/', function(req, res, next) {
  sql.find(Consumer,{},{_id:0}).then((data)=>{
    res.send(data);
  })
});

router.get('/comments', function(req, res, next) {
  const randCount = req.query.randCount*1;
  const randStart = req.query.randStart*1;
  sql.paging(Consumer,{},{_id:0},randCount,randStart).then((data)=>{
    res.send(data);
  })
});



module.exports = router;
