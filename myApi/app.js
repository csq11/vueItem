// module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
// var productsNum = require('./routes/products/?num');
var usersRouter = require('./routes/users');

var app = express();

// cors解决跨域问题
var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next(); // 所有的接口都会经过这里，继续操作
}
app.use(allowCrossDomain); // 整个应用生效

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(session({ // 修改完代码之后 重新需要登陆，这是正常
  secret : "nihao", //加密session，随便写 
  cookie : {maxAge : 60*1000*30}, //设置过期时间 --- 半小时 
  resave : true, //强制保存session 默认为 true，建议设置成false 
  saveUninitialized : false ////强制将未初始化的session存储 默认为true，建议设置成true 
}));

app.use('/',indexRouter);
app.use('/products',productsRouter)
// app.use('/products/?num',productsNum)
app.use('/users',usersRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
