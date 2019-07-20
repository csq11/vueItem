var express = require('express');
var router = express.Router();
var Address = require('./../sql/address'); 
var sql = require('./../sql/index'); // <==>  ./../sql
/* GET users listing. */
router.post('/',function(req,res,next){
  const uid=req.body.user
  sql.find(Address,{user:uid},{_id:0}).then((data)=>{
    res.send(data)
  })
});



module.exports = router;
