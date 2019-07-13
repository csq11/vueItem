var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Admin = require('./../sql/admin');
var sql = require('./../sql');
/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.cookies.isLogin !== 'ok') { // cookie
  //   res.redirect('/login');
  //   return;
  // }
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  res.render('index', { 
    aindex: 1
   });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/loginAction', (req, res, next) => {
  // res.send(req.body)
  let { username, password } = req.body;
  // 设置密码强度
  const salt = bcrypt.genSaltSync(10);
  // HASH值 为加密的密码 
  // var hash = bcrypt.hashSync(password, salt); 
  // 可以先依据用户名查询数据库，查询到账户后拿到账户的之前加密过后的密码，直接和现在的密码做对比，如果未true，表示可以登录
  sql.find(Admin, { username: username}, { _id: 0 }).then(data => {
    if (data.length === 0) {
      // 表示该账户不是管理员
      res.redirect('login')
    } else {
      let flag = bcrypt.compareSync(password, data[0].password)
      if (flag) {
        // 登录成功
        // 存cokkie
        // res.cookie('isLogin', 'ok')
        // session
        req.session.isLogin = 'ok'
        res.redirect('/')
      } else {
        // 密码错误
        res.redirect('/login')
      }
    }
  })
})

router.get('/logout', (req, res, next) => {
  // res.cookie('isLogin', 1);
  req.session.isLogin = '1'; // req.session.destroy() 
  res.redirect('/login')
})
module.exports = router;
