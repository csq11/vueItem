var express = require('express');
var router = express.Router();

var sql = require('../sql/index');
var Product = require('../sql/products');
/* GET users listing. */
router.get('/', function(req, res, next) {
  const productType = req.query.productType ||1;
  sql.find(Product,{type:productType},{_id:0}).then((data)=>{
    res.send(data);
  })
});

router.get('/paging', function(req,res,next) {
  const count = req.query.count*1 ||5;
  const pageNum = req.query.pageNum*1 ||1;
  const productType = req.query.productType ||1;
  sql.paging(Product,{type:productType},{_id:0},count,pageNum).then((data)=>{
    res.send(data)
  })
});


router.get('/detail',function(req,res,next) {
  const num = req.query.id;
  sql.find(Product,{id:num},{_id:0}).then((data)=>{
    res.send(data)
  })
})

router.get('/paging/image', function(req,res,next) {
  const count = req.query.count*1 || 5;
  const pageNum = req.query.pageNum*1 ||1;
  sql.paging(Product,{},{_id:0,image_url:1},count,pageNum).then((data)=>{
    res.send(data)
  })
})


module.exports = router;
