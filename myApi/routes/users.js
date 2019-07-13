var express = require('express');
var router = express.Router();
const xlsx = require('node-xlsx');
const nodeExcel = require('excel-export');
var User = require('./../sql/user'); 
var sql = require('./../sql/index'); // <==>  ./../sql
/* GET users listing. */
router.get('/', function(req, res, next) {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return;
  // }
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  sql.find(User, {}, { _id: 0}).then((data) => {
    res.render('users', { 
      aindex: 2,
      data: data
    });
  })
  // res.render('users', { 
  //   aindex: 2
  //  });
});

router.get('/delete', function (req, res, next) {
  // var tel = req.query.tel  // req.query   ----  { tel: 1232244646}
  // const { tel } = req.query;
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  sql.delete(User, req.query).then(() => {
    res.redirect('/users') // 删除成功后重定向到 用户管理页面
  })
})

router.get('/add', function (req, res, next) {
  // if (req.cookies.isLogin !== 'ok') {
  //   res.redirect('/login');
  //   return;
  // }
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  res.render('usersAdd.ejs', {
    aindex: 2
  })
})

router.post('/addAction', (req, res, next) => {
  // res.send(req.body)
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  let insertData = req.body;
  insertData.age *= 1;
  sql.insert(User, insertData).then(() => res.redirect('/users'))
})

router.get('/update', function (req, res, next) {
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  sql.find(User, req.query, { _id: 0 }).then(data => {
    res.render('usersUpdate', {
      aindex: 2,
      username: data[0].username, // data 是一个数组，只有一个元素
      password: data[0].password,
      age: data[0].age,
      tel: data[0].tel,
      sex: data[0].sex,
      lesson: data[0].lesson,
      city: data[0].city
    })
  })
})

router.post('/updateAction', (req, res, next) => {
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  // res.send(req.body)
  let updateObj = req.body;
  updateObj.age *= 1;
  const { tel } = updateObj;
  sql.update(User, { tel: tel }, { $set: updateObj }).then(() => res.redirect('/users'));
})

const xlsxfile = 'E:/course-wxx/sh-1904/week1/day04/myapp/public/1902.xlsx';
router.get('/upload', (req, res, next) => {
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  const obj = xlsx.parse(xlsxfile);
  // res.send(obj) // excel有几张表，这个数组就有多少个元素
  // res.send(obj[0])
  // res.send(obj[0].data) // 遍历除了第一个元素，第一个元素是表头
  let arr = []
  obj[0].data.forEach((item, index) => {
    if (index !== 0) { // ["张玉印",0,18,13275585217,217,1,"安徽"]   item
      arr.push({
        username: item[0],
        sex: item[1] + '',
        age: item[2],
        tel: item[3] + '',
        password: item[4] + '',
        lesson: item[5] + '',
        city: item[6]
      })
    }
  })
  // res.send(arr)
  sql.insert(User, arr).then(() => res.redirect('/users'))
})

router.get('/deleteAll', (req, res, next) => {
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  sql.delete(User, {}, 'deleteMany').then(() => res.redirect('/users'))
})
function exportdata(v, res) {
  let conf ={};
  conf.name = "mysheet";//表格名
  let alldata = new Array();
  for(let i = 0;i<v.length;i++){
      let arr = new Array(); // 转成二维数组 ["张玉印",0,18,13275585217,217,1,"安徽"]
      arr.push(v[i].username);
      arr.push(v[i].password);
      arr.push(v[i].age);
      arr.push(v[i].tel);
      arr.push(v[i].sex);
      arr.push(v[i].lesson);
      arr.push(v[i].city);
      alldata.push(arr);
  }
  //决定列名和类型
  conf.cols = [{
      caption:'用户名',
      type:'string'
  },{
      caption:'密码',
      type:'string'
  },{
      caption:'年龄',
      type:'number'
  },{
    caption:'电话号码',
    type:'string'
},{
      caption:'性别',
      type:'string',
      //width:280
  },
  {
    caption:'阶段',
    type:'string',
    //width:280
},{
  caption:'城市',
  type:'string',
  //width:280
}];
  conf.rows = alldata;//填充数据
  let result = nodeExcel.execute(conf);
  //最后3行express框架是这样写
  res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  res.end(result, 'binary');
}
router.get('/export', (req, res, next) => {
  if (req.session.isLogin !== 'ok') { // sesssion
    res.redirect('/login');
    return;
  }
  sql.find(User, {}, { _id: 0 }).then(data => {
    exportdata(data, res)
  })
})
module.exports = router;
