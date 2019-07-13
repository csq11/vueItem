var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' }); // 最终图片上传到了uploads文件夹内 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('product', { 
    aindex: 3
   });
});

// Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息。
// req.body --- 输入框信息
// req.file --- 上传的文件的信息
// upload.single('ppic') 上传单张图片，图片的name值为ppic
router.post('/addAction', upload.single('ppic'), function(req, res, next) {
  var arr = req.file.originalname.split('.');
  var hou = arr[arr.length - 1];
  var oldFile = './uploads/' + req.file.filename;
  var newFile = './uploads/' + req.file.filename + '.' + hou;
  fs.rename(oldFile, newFile, (err) => {
    if (err) throw err;
    res.send('上传成功')
  })
  // res.send({
  //     body: req.body,
  //     file: req.file
  //   })
});
module.exports = router;
