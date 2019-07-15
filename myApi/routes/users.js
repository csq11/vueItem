var express = require('express');
var router = express.Router();
var User = require('./../sql/user'); 
var sql = require('./../sql/index'); // <==>  ./../sql
/* GET users listing. */
router.get('/',function(req,res,next){
  sql.find(User,{},{_id:0}).then((data)=>{
    res.send(data)
  })
});

router.get('/register',function(req,res,next){
  const tl = req.query.tel
  const pwd = req.query.password
  var flag = true
  sql.find(User,{},{_id:0}).then((data)=>{
   
    for(let i=0;i<data.length;i++) {
      if(data[i].tel === tl) {
        flag = false;
        res.send('用户已存在')
        break;
      } 
      // res.send(data)
      // break;
    }
    if(flag) {
      const insertData = [{
        tel: tl,
        password: pwd
      }]
      sql.insert(User,insertData).then((data)=>{
        res.send('success')
      })
    }
  })
});

router.post('/login', function(req,res,next){
  const tl = req.body.tel;
  const pwd = req.body.password;
  var flag = false;
  sql.find(User,{},{_id:0}).then((data)=>{
    console.log(data);
    for(let i=0;i<data.length;i++) {
      if(data[i].tel === tl ) {
        flag = true;
        pd = data[i].password
      }
      if(flag) {
        if(pd === pwd) {
          res.send('1')//登录成功
        } else {
          res.send('2')//密码错误
        }
      } else {
        res.send('3')//用户不存在
      }
    }
  })
})


module.exports = router;
